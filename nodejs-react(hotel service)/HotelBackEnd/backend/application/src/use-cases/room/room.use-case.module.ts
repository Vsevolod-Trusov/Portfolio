import { Module } from '@nestjs/common';
import { RoomUseCases } from './room.use-case';
import { AuthModule } from '../../frameworks/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [RoomUseCases],
  exports: [RoomUseCases]
})

export class RoomUseCasesModule {}
