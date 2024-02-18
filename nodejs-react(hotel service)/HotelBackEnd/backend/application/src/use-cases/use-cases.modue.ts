import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './user/user.use-case.module';
import { TourUseCasesModule } from './tour/tour.use-case.module';
import { HobbyUseCasesModule } from './hobby/hobby.use-case.module';
import { FeedbackUseCasesModule } from './feedback/feedback.use-case.module';
import { MealUseCasesModule } from './meal/meal.use-case.module';
import { RoomUseCasesModule } from './room/room.use-case.module';
import { NewsUseCasesModule } from './news/news.use-case.module';

@Module({
  imports: [
    UserUseCasesModule,
    TourUseCasesModule,
    HobbyUseCasesModule,
    FeedbackUseCasesModule,
    MealUseCasesModule,
    RoomUseCasesModule,
    NewsUseCasesModule
  ],
  exports: [
    UserUseCasesModule,
    TourUseCasesModule,
    HobbyUseCasesModule,
    FeedbackUseCasesModule,
    MealUseCasesModule,
    RoomUseCasesModule,
    NewsUseCasesModule
  ]
})
export class UseCasesModule {}
