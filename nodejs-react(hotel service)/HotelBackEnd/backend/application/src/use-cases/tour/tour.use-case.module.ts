import { Module } from '@nestjs/common';
import { TourUseCases } from './tour.use-case';
import { AuthModule } from '../../frameworks/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [TourUseCases],
  exports: [TourUseCases]
})

export class TourUseCasesModule {}
