import { Module } from '@nestjs/common';
import { FeedbackUseCases} from './feedback.use-cases';
import { AuthModule } from '../../frameworks/auth/auth.module';


@Module({
  imports: [AuthModule],
  providers: [FeedbackUseCases],
  exports: [FeedbackUseCases]
})
export class FeedbackUseCasesModule {}

