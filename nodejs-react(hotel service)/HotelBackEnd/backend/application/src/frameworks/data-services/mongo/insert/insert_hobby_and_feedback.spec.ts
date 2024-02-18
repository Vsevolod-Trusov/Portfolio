import { Test, TestingModule } from '@nestjs/testing';
import { MongoDataService } from '../mongo-data-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.model';
import { Room, RoomDocument, RoomSchema } from '../models/room.model';
import { OrderRoom, OrderRoomDocument, OrderRoomSchema } from '../models/order_room.model';
import { RoomService, RoomServiceDocument, RoomServiceSchema } from '../models/room_service';
import { RoomType } from '../models/room_type.model';
import { Meal, MealDocument, MealSchema } from '../models/meal.model';
import { PlaceTable, PlaceTableDocument, PlaceTableSchema } from '../models/place_table.model';
import { OrderMeal, OrderMealDocument, OrderMealSchema } from '../models/order_meal.model';
import { Feedback, FeedbackDocument, FeedbackSchema } from '../models/feedback.model';
import { FreeTimeInfo, FreeTimeInfoDocument, FreeTimeInfoSchema } from '../models/free_time_info';
import { Tour, TourDocument, TourSchema } from '../models/tour.model';
import { OrderTour, OrderTourDocument, OrderTourSchema } from '../models/order_tour.model';

describe('Insert room and room type', () => {
  let service: MongoDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
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
      ],
      providers: [MongoDataService]
    }).compile();

    service = module.get<MongoDataService>(MongoDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert hobby', async () => {
    service.onApplicationBootstrap()

    let hobby: FreeTimeInfo = new FreeTimeInfo()

    hobby.leisureName = 'Gym'
    hobby.description = 'different trainings'
    hobby.price = 25.5
    await service.hobbies.create(<FreeTimeInfoDocument>hobby)
    let val = true
    expect(val).toBe(true);
  });

  it('should insert feedback', async () => {
    service.onApplicationBootstrap()

    let user: User = await service.users.get('6416df17ec599def02cfdc0b')
    let feedback: Feedback = new Feedback()

    feedback.userLogin = user
    feedback.review = 'cool hotel'
    feedback.estimation = 5

    await service.feedbacks.create(<FeedbackDocument>feedback)
    let val = true
    expect(val).toBe(true);
  });
});
