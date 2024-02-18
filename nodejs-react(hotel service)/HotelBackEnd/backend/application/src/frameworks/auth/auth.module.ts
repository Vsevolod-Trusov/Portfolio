import {  Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataServiceModule } from '../data-services/data-services.module';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshTokenStrategy } from './services/jwt-refresh.strategy';
import { RoleGuard } from './services/role.guard';

@Module({
  imports: [
    ConfigModule,
    DataServiceModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION')}
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy, RoleGuard],
  exports: [AuthService],
})
export class AuthModule {}
