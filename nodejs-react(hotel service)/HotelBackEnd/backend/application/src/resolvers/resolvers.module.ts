import { Module } from '@nestjs/common';
import { UserGraphResolver } from './user/user.resolver';
import { TourGraphResolver } from './tour/tour.resolver';
import { HobbyGraphResolver } from './hobby/hobby.resolver';
import { FeedbackGraphResolver } from './feedback/feedback.resolver';
import { MealGraphResolver } from './meal/meal.resolver';
import { RoomGraphResolver } from './room/room.resolver';
import { UseCasesModule } from '../use-cases/use-cases.modue';
import { GraphQlServiceModule } from '../frameworks/graphQL-service/graph-ql-service/graph-ql-service.module';
import { AuthModule } from '../frameworks/auth/auth.module';
import { NewsGraphResolver } from './news/news.resolver';

@Module({
  imports: [
    UseCasesModule,
    GraphQlServiceModule,
    AuthModule
  ],
  providers: [
    UserGraphResolver, TourGraphResolver, HobbyGraphResolver,
    FeedbackGraphResolver, MealGraphResolver, RoomGraphResolver,
    NewsGraphResolver
  ],
  exports: [
    UserGraphResolver, TourGraphResolver, HobbyGraphResolver,
    FeedbackGraphResolver, MealGraphResolver, RoomGraphResolver,
    NewsGraphResolver
  ],
})

export class ResolversModule {
}
