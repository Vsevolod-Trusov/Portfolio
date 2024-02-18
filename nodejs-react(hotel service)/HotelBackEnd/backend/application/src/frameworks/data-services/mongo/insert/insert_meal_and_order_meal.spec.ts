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
import { Feedback, FeedbackSchema } from '../models/feedback.model';
import { FreeTimeInfo, FreeTimeInfoSchema } from '../models/free_time_info';
import { Tour, TourSchema } from '../models/tour.model';
import { OrderTour, OrderTourSchema } from '../models/order_tour.model';

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

  it('should insert meal', async () => {
    service.onApplicationBootstrap()

    let meal: Meal = new Meal()

    meal.mealName = 'Big-Mak'
    meal.mealDescription = 'Delicious dish'
    meal.mealPrice = 1.25

    await service.meals.create(<MealDocument>meal)
    let val = true
    expect(val).toBe(true);
  });

  it('should insert table', async () => {
    service.onApplicationBootstrap()

    let table: PlaceTable = new PlaceTable()

    table.tableNumber = 'Table-01'
    table.status = 'free'
    table.amountSeats = 2

    await service.placeTables.create(<PlaceTableDocument>table)
    let val = true
    expect(val).toBe(true);
  });

  it('should insert orderMeal in room', async () => {
    service.onApplicationBootstrap()

    let meal: Meal = await service.meals.get('6416ed5b26eea061bc2ac3fa')
    let user: User = await service.users.get('6416df17ec599def02cfdc0b')

    let orderMeal: OrderMeal = new OrderMeal()
    orderMeal.mealsAmount = [1]
    orderMeal.meals = [meal]
    orderMeal.orderPrice = 5
    orderMeal.inRoom = true
    orderMeal.userLogin = user
    await service.orderMeals.create(<OrderMealDocument>orderMeal)
    let val = true
    expect(val).toBe(true);
  });

  it('should insert orderMeal in restaurant', async () => {
    service.onApplicationBootstrap()

    let meal: Meal = await service.meals.get('6416ed5b26eea061bc2ac3fa')
    let table: PlaceTable = await service.placeTables.get('6416ed5c26eea061bc2ac40a')
    let user: User = await service.users.get('6416df17ec599def02cfdc0b')

    let orderMeal: OrderMeal = new OrderMeal()
    orderMeal.mealsAmount = [1]
    orderMeal.meals = [meal]
    orderMeal.orderPrice = 5
    orderMeal.inRoom = false
    orderMeal.tableNumber = table
    orderMeal.userLogin = user
    await service.orderMeals.create(<OrderMealDocument>orderMeal)
    let val = true
    expect(val).toBe(true);
  });

});
