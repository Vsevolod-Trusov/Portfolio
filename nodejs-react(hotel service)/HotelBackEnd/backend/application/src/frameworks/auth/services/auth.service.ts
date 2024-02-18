import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { IDataServices } from '../../../core/contracts/data-service.contract';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInput } from '../../graphQL-service/dto/user/user.dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../../data-services/mongo/models/user.model';

@Injectable()
export class AuthService {

  readonly REFRESH_EXPIRATION = this.configService.get<string>('REFRESH_TOKEN_EXPIRATION');

  readonly REFRESH_SECRET = this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');

  readonly JWT_SECRET = this.configService.get<string>('JWT_SECRET');

  readonly JWT_EXPIRATION = this.configService.get<string>('JWT_EXPIRATION');

  constructor(
    private readonly configService: ConfigService,
    private readonly dataService: IDataServices,
    private readonly jwtTokenService: JwtService,
  ) {
  }

  async validateUser({ login, password }): Promise<any> {
    const user = await this.dataService.users.findOneByParameters({ login: login });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async checkRefreshTokenIsValid(token: string) {
    try {
      return await this.jwtTokenService.verifyAsync(token, { secret: this.REFRESH_SECRET, ignoreExpiration: false });
    } catch (error) {
      return false;
    }
  }

  async generateUserCredentials(userInput: UserInput) {
    let user: User = await this.dataService.users.findOneByParameters({ login: userInput.login });

    const payload = {
      email: user.email,
      login: userInput.login,
      role: user.role,
    };

    if (!await this.checkRefreshTokenIsValid(user.refreshToken)) {
      user.refreshToken = await this.generateRefreshToken(payload);
      await this.dataService.users.update({ login: user.login }, user);
    }

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: user.refreshToken,
      role: user.role,
      login: payload.login,
      email: payload.email,
      subscribedOnNews: user.subscribedOnNews
    };
  }

  private async generateAccessToken(payload) {
    return this.jwtTokenService.sign(payload, { secret: this.JWT_SECRET, expiresIn: this.JWT_EXPIRATION });
  }

  async getRefreshTokenByUser(user: UserInput) {
    const payload = {
      email: user.email,
      login: user.login,
      role: user.role,
    };

    return await this.generateRefreshToken(payload);
  }

  private async generateRefreshToken(payload) {

    return this.jwtTokenService.sign(payload, { secret: this.REFRESH_SECRET, expiresIn: this.REFRESH_EXPIRATION });
  }

  async getRoleAndLoginByAccessToken(token: string) {
     const payload = this.jwtTokenService.decode(token);

     return {
       login: payload['login'],
       role: payload['role'],
     };

  }
}
