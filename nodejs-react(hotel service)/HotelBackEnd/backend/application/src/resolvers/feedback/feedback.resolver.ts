import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeedbackUseCases } from '../../use-cases/feedback/feedback.use-cases';
import { Feedback } from '../../frameworks/data-services/mongo/models/feedback.model';
import { FeedbackInput } from '../../frameworks/graphQL-service/dto/feedback/feedback.input';
import { Roles } from '../../frameworks/auth/services/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth/services/jwt-auth.guard';
import { RoleGuard } from '../../frameworks/auth/services/role.guard';

@Resolver()
export class FeedbackGraphResolver {
  constructor(private feedbackUseCases: FeedbackUseCases) {
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Feedback)
  async createFeedback(@Args('createFeedback') feedbackInput: FeedbackInput,
                       @Args('token') token: string): Promise<Feedback>{
    return await this.feedbackUseCases.createFeedback(feedbackInput, token)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [Feedback])
  async getAllFeedbacks(): Promise<Feedback[]> {
    return await this.feedbackUseCases.getAllFeedbacks()
  }
}
