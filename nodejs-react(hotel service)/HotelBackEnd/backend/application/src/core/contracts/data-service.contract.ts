import { IGenericRepository } from './generic-repository.contract';
import { User } from '../../frameworks/data-services/mongo/models/user.model';
import { Room } from '../../frameworks/data-services/mongo/models/room.model';
import { RoomService } from '../../frameworks/data-services/mongo/models/room_service';
import { OrderRoom } from '../../frameworks/data-services/mongo/models/order_room.model';
import { Meal } from '../../frameworks/data-services/mongo/models/meal.model';
import { PlaceTable } from '../../frameworks/data-services/mongo/models/place_table.model';
import { OrderMeal } from '../../frameworks/data-services/mongo/models/order_meal.model';
import { Tour } from '../../frameworks/data-services/mongo/models/tour.model';
import { OrderTour } from '../../frameworks/data-services/mongo/models/order_tour.model';
import { Feedback } from '../../frameworks/data-services/mongo/models/feedback.model';
import { FreeTimeInfo } from '../../frameworks/data-services/mongo/models/free_time_info';
import { News } from '../../frameworks/data-services/mongo/models/news.model';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;

  abstract rooms: IGenericRepository<Room>;
  abstract roomServices: IGenericRepository<RoomService>;
  abstract orderRooms: IGenericRepository<OrderRoom>;
  abstract meals: IGenericRepository<Meal>;
  abstract placeTables: IGenericRepository<PlaceTable>;
  abstract orderMeals: IGenericRepository<OrderMeal>;
  abstract tours: IGenericRepository<Tour>;
  abstract orderTours: IGenericRepository<OrderTour>;
  abstract feedbacks: IGenericRepository<Feedback>;
  abstract hobbies: IGenericRepository<FreeTimeInfo>;

  abstract news: IGenericRepository<News>;
}
