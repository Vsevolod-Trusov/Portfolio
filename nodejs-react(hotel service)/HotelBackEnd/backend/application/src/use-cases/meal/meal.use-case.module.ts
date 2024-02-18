import { Module } from '@nestjs/common';
import { MealUseCases } from './meal.use-case';
import { AuthModule } from '../../frameworks/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [MealUseCases],
  exports: [MealUseCases]
})

export class MealUseCasesModule {}
