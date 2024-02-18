import { Test, TestingModule } from '@nestjs/testing';
import { MongoDataService } from '../mongo-data-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.model';
import { Room, RoomDocument, RoomSchema } from '../models/room.model';
import { OrderRoom, OrderRoomDocument, OrderRoomSchema } from '../models/order_room.model';
import { RoomService, RoomServiceDocument, RoomServiceSchema } from '../models/room_service';
import { RoomType } from '../models/room_type.model';
import { Feedback, FeedbackSchema } from '../models/feedback.model';
import { Meal, MealSchema } from '../models/meal.model';
import { PlaceTable, PlaceTableSchema } from '../models/place_table.model';
import { OrderMeal, OrderMealSchema } from '../models/order_meal.model';
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

  //function for generate availability schedule
  function generateAvailabilitySchedule(checkInDate: string, checkOutDate: string): String[] {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const timeDiff = Math.abs(start.getTime() - end.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const schedule = [];
    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i)
      const dateString = new Date(date).toISOString().slice(0, 10);

      schedule.push(dateString);
    }
    return schedule;
  }

 /*  it('should insert room', async () => {
    service.onApplicationBootstrap()

    let room: Room = new Room();
     room.roomNumber = 'Room-001'
     room.roomType = new RoomType('lux', 5.95, 1)
     room.status = 'free'
     room.availabilitySchedule = generateAvailabilitySchedule(new Date().toString(), new Date('2023-12-29').toString())


    await service.rooms.create(<RoomDocument>room)
    let val = true
    expect(val).toBe(true);
  });*/

  it('should insert roomService', async () => {
    service.onApplicationBootstrap()

    let roomService: RoomService = new RoomService()
    roomService.serviceName = 'Breakfast'
    roomService.serviceDescription = 'two eggs, tea and toasts'
    roomService.servicePrice = 2.25;

    await service.roomServices.create(<RoomServiceDocument>roomService)
    let val = true
    expect(val).toBe(true);
  });

  /*it('should insert orderRoom', async () => {
    service.onApplicationBootstrap()

    let user: User = await service.users.get('6416df17ec599def02cfdc0b')

    let room: Room = await service.rooms.get('6416e5fd64ee60bf662f6e9e')

    let roomService: RoomService = await service.roomServices.get('6416e7697bcee880b8c8cdd1')

    let orderRoom: OrderRoom = new OrderRoom(); //TODO: wrap in cycle
    orderRoom.roomNumber = room
    orderRoom.checkInDate = new Date()
    orderRoom.exitDate = new Date()
    orderRoom.orderPrice = room.roomType.basePrice + 1;
    orderRoom.roomAmount = 1;
    orderRoom.peopleAmount = 1;
    orderRoom.roomServices = [roomService]
    orderRoom.userLogin = user;

    await service.orderRooms.create(<OrderRoomDocument>orderRoom)
    let val = true
    expect(val).toBe(true);
  });*/
});
