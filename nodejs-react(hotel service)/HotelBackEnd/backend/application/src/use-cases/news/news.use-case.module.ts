import { Module } from '@nestjs/common';
import { NewsUseCases } from './news.use-case';

@Module({
  providers: [NewsUseCases],
  exports: [NewsUseCases],
})

export class NewsUseCasesModule {
}
