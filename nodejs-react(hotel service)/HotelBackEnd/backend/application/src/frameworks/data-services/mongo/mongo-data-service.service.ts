import { IDataServices } from '../../../core/contracts/data-service.contract';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoGenericRepository } from './mongo-generic-repository';
import { User, UserDocument } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './models/room.model';
import { OrderRoom, OrderRoomDocument } from './models/order_room.model';
import { RoomService, RoomServiceDocument } from './models/room_service';
import { Meal, MealDocument } from './models/meal.model';
import { PlaceTable, PlaceTableDocument } from './models/place_table.model';
import { OrderMeal, OrderMealDocument } from './models/order_meal.model';
import { OrderTour, OrderTourDocument } from './models/order_tour.model';
import { Tour, TourDocument } from './models/tour.model';
import { FreeTimeInfo, FreeTimeInfoDocument } from './models/free_time_info';
import { Feedback, FeedbackDocument } from './models/feedback.model';
import { News, NewsDocument } from './models/news.model';

@Injectable()
export class MongoDataService implements IDataServices, OnApplicationBootstrap {

  users: MongoGenericRepository<UserDocument>;

  rooms: MongoGenericRepository<RoomDocument>;
  roomServices: MongoGenericRepository<RoomServiceDocument>;
  orderRooms: MongoGenericRepository<OrderRoomDocument>;

  meals: MongoGenericRepository<MealDocument>;
  placeTables: MongoGenericRepository<PlaceTableDocument>;
  orderMeals: MongoGenericRepository<OrderMealDocument>;

  tours: MongoGenericRepository<TourDocument>;
  orderTours: MongoGenericRepository<OrderTourDocument>;

  feedbacks: MongoGenericRepository<FeedbackDocument>;
  hobbies: MongoGenericRepository<FreeTimeInfoDocument>;

  news: MongoGenericRepository<NewsDocument>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,

    @InjectModel(Room.name)
    private RoomRepository: Model<RoomDocument>,
    @InjectModel(RoomService.name)
    private RoomServiceRepository: Model<RoomServiceDocument>,
    @InjectModel(OrderRoom.name)
    private OrderRoomRepository: Model<OrderRoomDocument>,
    @InjectModel(Meal.name)
    private MealRepository: Model<MealDocument>,
    @InjectModel(PlaceTable.name)
    private PlaceTableRepository: Model<PlaceTableDocument>,
    @InjectModel(OrderMeal.name)
    private OrderMealRepository: Model<OrderMealDocument>,
    @InjectModel(Tour.name)
    private TourRepository: Model<TourDocument>,
    @InjectModel(OrderTour.name)
    private OrderTourRepository: Model<OrderTourDocument>,
    @InjectModel(FreeTimeInfo.name)
    private FreeTimeInfoRepository: Model<FreeTimeInfoDocument>,
    @InjectModel(Feedback.name)
    private FeedbackRepository: Model<FeedbackDocument>,
    @InjectModel(News.name)
    private NoteRepository: Model<NewsDocument>,

  ) {
  }

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<UserDocument>(this.UserRepository, ['avatar']);

    this.rooms = new MongoGenericRepository<RoomDocument>(this.RoomRepository, ['roomType']);
    this.roomServices = new MongoGenericRepository<RoomServiceDocument>(this.RoomServiceRepository, ['orderRooms']);
    this.orderRooms = new MongoGenericRepository<OrderRoomDocument>(this.OrderRoomRepository, ['roomNumber', 'userLogin', 'roomServices']);

    this.meals = new MongoGenericRepository<MealDocument>(this.MealRepository);
    this.placeTables = new MongoGenericRepository<PlaceTableDocument>(this.PlaceTableRepository);
    this.orderMeals = new MongoGenericRepository<OrderMealDocument>(this.OrderMealRepository, ['userLogin', 'tableNumber']);

    this.tours = new MongoGenericRepository<TourDocument>(this.TourRepository);
    this.orderTours = new MongoGenericRepository<OrderTourDocument>(this.OrderTourRepository,['tourName', 'userLogin']);

    this.feedbacks = new MongoGenericRepository<FeedbackDocument>(this.FeedbackRepository,['userLogin']);
    this.hobbies = new MongoGenericRepository<FreeTimeInfoDocument>(this.FreeTimeInfoRepository);

    this.news = new MongoGenericRepository<NewsDocument>(this.NoteRepository);

  }

}
