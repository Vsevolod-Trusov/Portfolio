import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { IDataServices } from '../../../core/contracts/data-service.contract';
import { MongoDataService } from './mongo-data-service.service';
import { Room, RoomSchema } from './models/room.model';
import { OrderRoom, OrderRoomSchema } from './models/order_room.model';
import { RoomService, RoomServiceSchema } from './models/room_service';
import { Feedback, FeedbackSchema } from './models/feedback.model';
import { Meal, MealSchema } from './models/meal.model';
import { PlaceTable, PlaceTableSchema } from './models/place_table.model';
import { OrderMeal, OrderMealSchema } from './models/order_meal.model';
import { FreeTimeInfo, FreeTimeInfoSchema } from './models/free_time_info';
import { Tour, TourSchema } from './models/tour.model';
import { OrderTour, OrderTourSchema } from './models/order_tour.model';
import { ConfigService } from '@nestjs/config';
import { News, NewsSchema } from './models/news.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
      { name: OrderRoom.name, schema: OrderRoomSchema },
      { name: RoomService.name, schema: RoomServiceSchema },
      { name: Feedback.name, schema: FeedbackSchema },
      { name: Meal.name, schema: MealSchema },
      { name: PlaceTable.name, schema: PlaceTableSchema },
      { name: OrderMeal.name, schema: OrderMealSchema },
      { name: FreeTimeInfo.name, schema: FreeTimeInfoSchema },
      { name: Tour.name, schema: TourSchema },
      { name: OrderTour.name, schema: OrderTourSchema },
      { name: News.name, schema: NewsSchema },
    ]),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_CONNECTION')
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataService,
    },
  ],
  exports: [IDataServices],
})

export class MongoDataServiceModule {
}
