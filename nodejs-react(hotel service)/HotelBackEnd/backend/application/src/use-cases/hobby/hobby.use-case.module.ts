import { Module } from '@nestjs/common';
import { HobbyUseCases } from './hobby.use-cases';


@Module({
  providers: [HobbyUseCases],
  exports: [HobbyUseCases]
})
// @ts-ignore
export class HobbyUseCasesModule {}

