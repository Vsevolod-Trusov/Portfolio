import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-case';
import { AuthModule } from '../../frameworks/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})

export class UserUseCasesModule {
}
