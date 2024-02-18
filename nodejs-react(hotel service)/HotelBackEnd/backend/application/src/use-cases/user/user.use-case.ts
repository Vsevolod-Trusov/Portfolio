import { User } from '../../frameworks/data-services/mongo/models/user.model';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { IDataServices } from '../../core/contracts/data-service.contract';
import { AccessTokenOutput, UserInput } from '../../frameworks/graphQL-service/dto/user/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../frameworks/auth/services/auth.service';

@Injectable()
export class UserUseCases {
  constructor(
    private dataService: IDataServices,
    private readonly authService: AuthService,
  ) {}

  async createUser(user: UserInput): Promise<User> {
    const saltOrRounds = 10;
    try {
      user.password = await bcrypt.hash(user.password, saltOrRounds)
      user.refreshToken = await this.authService.getRefreshTokenByUser(user)
      return await this.dataService.users.create(user);
    } catch (error) {
      throw error;
    }
  }

  async getUserByFilter(filter: object): Promise<User> {
    try {
      return await this.dataService.users.findOneByParameters(filter);
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginUserInput: UserInput) {
    try{
      const user = await this.authService.validateUser(loginUserInput);
      if (!user) {
        throw new UnauthorizedException(`Login or password are invalid`);
      }

      return this.authService.generateUserCredentials(user);
    }catch (error) {
      throw error;
    }
  }

  async getRoleByAccessToken(token: string) {

    try{
      return this.authService.getRoleAndLoginByAccessToken(token)
    }catch (error) {
      throw error;
    }
  }

  async getUserIsSubscribed(token: string) {

    try{
      const {login} = await this.authService.getRoleAndLoginByAccessToken(token)

      const checkingUser = await this.dataService.users.findOneByParameters({login: login})

      if (!checkingUser) {
        throw new BadRequestException(`No such user`);
      }


      return checkingUser.subscribedOnNews
    }catch (error) {
      throw error;
    }
  }

  async subscribeUserOnNews(token: string) {
    try{
      const {login} = await this.authService.getRoleAndLoginByAccessToken(token)

      const subscribingUser = await this.dataService.users.findOneByParameters({login: login})

      if (!subscribingUser) {
        throw new BadRequestException(`No such user`);
      }

      subscribingUser.subscribedOnNews = true
      await this.dataService.users.update({login: login}, subscribingUser)
      return subscribingUser
    }catch (error) {
      throw error;
    }
  }

  async unsubscribeUserOnNews(token: string) {
    try{
      const {login} = await this.authService.getRoleAndLoginByAccessToken(token)

      const subscribingUser = await this.dataService.users.findOneByParameters({login: login})

      if (!subscribingUser) {
        throw new BadRequestException(`No such user`);
      }

      subscribingUser.subscribedOnNews = false
      await this.dataService.users.update({login: login}, subscribingUser)
      return subscribingUser
    }catch (error) {
      throw error;
    }
  }
}
