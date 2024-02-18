import { BadRequestException, Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/contracts/data-service.contract';
import { Feedback } from '../../frameworks/data-services/mongo/models/feedback.model';
import { FeedbackInput } from '../../frameworks/graphQL-service/dto/feedback/feedback.input';
import { AuthService } from '../../frameworks/auth/services/auth.service';

@Injectable()
export class FeedbackUseCases {
  constructor(
    private dataService: IDataServices,
    private readonly authService: AuthService
  ) {
  }

  async createFeedback(feedback: FeedbackInput, token: string): Promise<Feedback> {
    try {
      const {login} = await this.authService.getRoleAndLoginByAccessToken(token)

      const existingUser = await this.dataService.users.findOneByParameters({login: login})

      if (!existingUser) {
        throw new BadRequestException('Login not defined')
      }

      feedback.userLogin = existingUser.login

      return await this.dataService.feedbacks.create(feedback);
    } catch (error) {
      throw error;
    }
  }

  async getAllFeedbacks(): Promise<Feedback[]> {
    try {
      return await this.dataService.feedbacks.getAll();
    } catch (error) {
      throw error;
    }
  }
}
