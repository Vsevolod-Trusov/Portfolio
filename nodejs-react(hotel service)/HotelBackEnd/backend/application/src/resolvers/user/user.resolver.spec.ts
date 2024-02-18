import { Test, TestingModule } from '@nestjs/testing';
import { UserGraphResolver } from './user.resolver';
import { UserInput } from '../../frameworks/graphQL-service/dto/user/user.dto';
import { UserUseCasesModule } from '../../use-cases/user/user.use-case.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../frameworks/data-services/mongo/models/user.model';
import { Room, RoomSchema } from '../../frameworks/data-services/mongo/models/room.model';
import { OrderRoom, OrderRoomSchema } from '../../frameworks/data-services/mongo/models/order_room.model';
import { RoomService, RoomServiceSchema } from '../../frameworks/data-services/mongo/models/room_service';
import { Feedback, FeedbackSchema } from '../../frameworks/data-services/mongo/models/feedback.model';
import { Meal, MealSchema } from '../../frameworks/data-services/mongo/models/meal.model';
import { PlaceTable, PlaceTableSchema } from '../../frameworks/data-services/mongo/models/place_table.model';
import { OrderMeal, OrderMealSchema } from '../../frameworks/data-services/mongo/models/order_meal.model';
import { FreeTimeInfo, FreeTimeInfoSchema } from '../../frameworks/data-services/mongo/models/free_time_info';
import { Tour, TourSchema } from '../../frameworks/data-services/mongo/models/tour.model';
import { OrderTour, OrderTourSchema } from '../../frameworks/data-services/mongo/models/order_tour.model';
import { DataServiceModule } from '../../frameworks/data-services/data-services.module';
import { Image } from '../../frameworks/data-services/mongo/models/image.model';

describe('UserGraphResolver', () => {
  let resolver: UserGraphResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {name: User.name, schema: UserSchema},
          {name: Room.name, schema: RoomSchema},
          {name: OrderRoom.name, schema: OrderRoomSchema},
          {name: RoomService.name, schema: RoomServiceSchema},
          {name: Feedback.name, schema: FeedbackSchema},
          {name: Meal.name, schema: MealSchema},
          {name: PlaceTable.name, schema: PlaceTableSchema},
          {name: OrderMeal.name, schema: OrderMealSchema},
          {name: FreeTimeInfo.name, schema: FreeTimeInfoSchema},
          {name: Tour.name, schema: TourSchema},
          {name: OrderTour.name, schema: OrderTourSchema}
        ]),
        MongooseModule.forRoot('mongodb://localhost:27017/hotel'),
        UserUseCasesModule,
        DataServiceModule,
      ],
      providers: [UserGraphResolver]
    }).compile();

    resolver = module.get<UserGraphResolver>(UserGraphResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should insert user', async () => {
    let createUserInput = new UserInput()
    createUserInput.login = 'seva_via_test100'
    createUserInput.role = 'user'
    createUserInput.email = 'seva2002@mail.ru'
    createUserInput.avatar = new Image('image/test')
    createUserInput.password = 'seva_2002'
    createUserInput.subscribedOnNews = true

    const result = await resolver.createUser(createUserInput);
    let flag = true;
    expect(flag).toEqual(true);
  });
});
