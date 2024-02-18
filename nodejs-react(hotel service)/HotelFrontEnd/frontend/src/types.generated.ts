export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AccessTokenOutput = {
  __typename?: 'AccessTokenOutput';
  login: Scalars['String'];
  role: Scalars['String'];
};

export type Deleted = {
  __typename?: 'Deleted';
  acknowledged: Scalars['Boolean'];
  deletedCount: Scalars['Float'];
};

export type Feedback = {
  __typename?: 'Feedback';
  estimation: Scalars['Float'];
  review: Scalars['String'];
  userLogin: Scalars['String'];
};

export type FeedbackInput = {
  estimation: Scalars['Float'];
  review: Scalars['String'];
  userLogin?: InputMaybe<Scalars['String']>;
};

export type FreeTimeInfo = {
  __typename?: 'FreeTimeInfo';
  description: Scalars['String'];
  leisureName: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
};

export type FreeTimeInfoInput = {
  description?: InputMaybe<Scalars['String']>;
  leisureName: Scalars['String'];
  price?: InputMaybe<Scalars['Float']>;
};

export type Image = {
  __typename?: 'Image';
  imagePath: Scalars['String'];
};

export type ImageInput = {
  imagePath: Scalars['String'];
};

export type Meal = {
  __typename?: 'Meal';
  mealDescription: Scalars['String'];
  mealName: Scalars['String'];
  mealPrice: Scalars['Float'];
};

export type MealInput = {
  mealDescription?: InputMaybe<Scalars['String']>;
  mealName: Scalars['String'];
  mealPrice?: InputMaybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeHobby: FreeTimeInfo;
  createFeedback: Feedback;
  createHobby: FreeTimeInfo;
  createMeal: Meal;
  createNews: Array<News>;
  createOrderMeal: OrderMeal;
  createOrderRoom: OrderRoom;
  createOrderTour: OrderTour;
  createRoom: Room;
  createRoomService: RoomService;
  createTable: PlaceTable;
  createTour: Tour;
  createUser: User;
  deleteOneHobby: Deleted;
  deleteOneMeal: Deleted;
  deleteOneMealOrder: Deleted;
  deleteOneOrderRoom: Deleted;
  deleteOneRoom: Deleted;
  deleteOneRoomService: Deleted;
  deleteOneTable: Deleted;
  deleteOneTour: Deleted;
  deleteOneTourOrder: Deleted;
  loginUser: UserOutput;
  subscribeOnNews: User;
  unsubscribeOnNews: User;
  updateMeal: Meal;
  updateOneRoom: Room;
  updateRoomService: RoomService;
  updateTable: PlaceTable;
  updateTour: Tour;
};


export type MutationChangeHobbyArgs = {
  hobby: FreeTimeInfoInput;
};


export type MutationCreateFeedbackArgs = {
  createFeedback: FeedbackInput;
  token: Scalars['String'];
};


export type MutationCreateHobbyArgs = {
  createHobby: FreeTimeInfoInput;
};


export type MutationCreateMealArgs = {
  createMeal: MealInput;
};


export type MutationCreateNewsArgs = {
  news: NewsInput;
};


export type MutationCreateOrderMealArgs = {
  createOrder: OrderMealInput;
  token: Scalars['String'];
};


export type MutationCreateOrderRoomArgs = {
  createOrderRoom: OrderRoomInput;
  token: Scalars['String'];
};


export type MutationCreateOrderTourArgs = {
  createOrderTour: OrderTourInput;
  token: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  createRoom: RoomInput;
};


export type MutationCreateRoomServiceArgs = {
  createRoomService: RoomServiceInput;
};


export type MutationCreateTableArgs = {
  createTable: PlaceTableInput;
};


export type MutationCreateTourArgs = {
  createTour: TourInput;
};


export type MutationCreateUserArgs = {
  createUser: UserInput;
};


export type MutationDeleteOneHobbyArgs = {
  hobbyName: Scalars['String'];
};


export type MutationDeleteOneMealArgs = {
  mealName: Scalars['String'];
};


export type MutationDeleteOneMealOrderArgs = {
  orderId: Scalars['String'];
};


export type MutationDeleteOneOrderRoomArgs = {
  orderId: Scalars['String'];
};


export type MutationDeleteOneRoomArgs = {
  name: Scalars['String'];
};


export type MutationDeleteOneRoomServiceArgs = {
  serviceName: Scalars['String'];
};


export type MutationDeleteOneTableArgs = {
  tableNumber: Scalars['String'];
};


export type MutationDeleteOneTourArgs = {
  tourName: Scalars['String'];
};


export type MutationDeleteOneTourOrderArgs = {
  orderId: Scalars['String'];
};


export type MutationLoginUserArgs = {
  userInput: UserInput;
};


export type MutationSubscribeOnNewsArgs = {
  token: Scalars['String'];
};


export type MutationUnsubscribeOnNewsArgs = {
  token: Scalars['String'];
};


export type MutationUpdateMealArgs = {
  meal: MealInput;
};


export type MutationUpdateOneRoomArgs = {
  room: RoomInput;
};


export type MutationUpdateRoomServiceArgs = {
  service: RoomServiceInput;
};


export type MutationUpdateTableArgs = {
  table: PlaceTableInput;
};


export type MutationUpdateTourArgs = {
  tour: TourInput;
};

export type News = {
  __typename?: 'News';
  _id: Scalars['String'];
  newsContent: Scalars['String'];
  newsDate: Scalars['DateTime'];
  newsHeader: Scalars['String'];
  newsImage: Image;
};

export type NewsInput = {
  _id?: InputMaybe<Scalars['String']>;
  newsContent?: InputMaybe<Scalars['String']>;
  newsDate?: InputMaybe<Scalars['DateTime']>;
  newsHeader?: InputMaybe<Scalars['String']>;
  newsImage?: InputMaybe<ImageInput>;
};

export type OrderMeal = {
  __typename?: 'OrderMeal';
  _id: Scalars['String'];
  bookDate?: Maybe<Scalars['String']>;
  bookTime?: Maybe<Scalars['String']>;
  inRoom: Scalars['Boolean'];
  meals: Array<Scalars['String']>;
  mealsAmount: Array<Scalars['Int']>;
  orderPrice: Scalars['Float'];
  tableNumber?: Maybe<Scalars['String']>;
  userLogin: Scalars['String'];
};

export type OrderMealInput = {
  _id?: InputMaybe<Scalars['String']>;
  bookDate?: InputMaybe<Scalars['String']>;
  bookTime?: InputMaybe<Scalars['String']>;
  inRoom: Scalars['Boolean'];
  meals: Array<Scalars['String']>;
  mealsAmount: Array<Scalars['Int']>;
  orderPrice: Scalars['Float'];
  tableNumber?: InputMaybe<Scalars['String']>;
  userLogin?: InputMaybe<Scalars['String']>;
};

export type OrderRoom = {
  __typename?: 'OrderRoom';
  _id: Scalars['String'];
  checkInDate: Scalars['DateTime'];
  exitDate: Scalars['DateTime'];
  orderPrice: Scalars['Float'];
  peopleAmount: Scalars['Float'];
  roomNumber: Scalars['String'];
  roomServices: Array<Scalars['String']>;
  roomType: Scalars['String'];
  userLogin: Scalars['String'];
};

export type OrderRoomInput = {
  _id?: InputMaybe<Scalars['String']>;
  checkInDate?: InputMaybe<Scalars['DateTime']>;
  exitDate?: InputMaybe<Scalars['DateTime']>;
  orderPrice?: InputMaybe<Scalars['Float']>;
  peopleAmount?: InputMaybe<Scalars['Float']>;
  roomNumber?: InputMaybe<Scalars['String']>;
  roomServices?: InputMaybe<Array<Scalars['String']>>;
  roomType: Scalars['String'];
  userLogin?: InputMaybe<Scalars['String']>;
};

export type OrderTour = {
  __typename?: 'OrderTour';
  _id: Scalars['String'];
  orderPrice: Scalars['Float'];
  peopleAmount: Scalars['Float'];
  tourDate: Scalars['DateTime'];
  tourName: Scalars['String'];
  userLogin: Scalars['String'];
};

export type OrderTourInput = {
  _id?: InputMaybe<Scalars['String']>;
  orderPrice?: InputMaybe<Scalars['Float']>;
  peopleAmount?: InputMaybe<Scalars['Float']>;
  tourDate?: InputMaybe<Scalars['DateTime']>;
  tourName?: InputMaybe<Scalars['String']>;
  userLogin?: InputMaybe<Scalars['String']>;
};

export type PlaceTable = {
  __typename?: 'PlaceTable';
  amountSeats: Scalars['Float'];
  availabilitySchedule: Array<TableTimesModel>;
  status: Scalars['String'];
  tableNumber: Scalars['String'];
};

export type PlaceTableInput = {
  amountSeats?: InputMaybe<Scalars['Float']>;
  availabilitySchedule?: InputMaybe<Array<TableTimesInput>>;
  status?: InputMaybe<Scalars['String']>;
  tableNumber: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findNewsByFilter: Array<News>;
  getAllFeedbacks: Array<Feedback>;
  getAllHobbies: Array<FreeTimeInfo>;
  getAllMealOrders: Array<OrderMeal>;
  getAllMeals: Array<Meal>;
  getAllOrderRooms: Array<OrderRoom>;
  getAllOrderTours: Array<OrderTour>;
  getAllRoomServices: Array<RoomService>;
  getAllRooms: Array<Room>;
  getAllTables: Array<PlaceTable>;
  getAllTours: Array<Tour>;
  getAmountTables: Scalars['Float'];
  getBookTimes: Array<TableTimeModel>;
  getIsSubscribed: Scalars['Boolean'];
  getLastNews: Array<News>;
  getOneTour: Tour;
  getOneUser: User;
  getRole: AccessTokenOutput;
  getRoomTypesToBook: Array<RoomType>;
  refreshToken: UserOutput;
};


export type QueryFindNewsByFilterArgs = {
  filter: NewsInput;
};


export type QueryGetBookTimesArgs = {
  bookDate: Scalars['String'];
  tableNumber: Scalars['String'];
};


export type QueryGetIsSubscribedArgs = {
  token: Scalars['String'];
};


export type QueryGetOneTourArgs = {
  tourName: Scalars['String'];
};


export type QueryGetOneUserArgs = {
  login: Scalars['String'];
};


export type QueryGetRoleArgs = {
  token: Scalars['String'];
};


export type QueryGetRoomTypesToBookArgs = {
  adultsAmount: Scalars['String'];
  finishDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type QueryRefreshTokenArgs = {
  userInput: UserInput;
};

export type Room = {
  __typename?: 'Room';
  availabilitySchedule: Array<Scalars['String']>;
  roomNumber: Scalars['String'];
  roomType: RoomType;
  status: Scalars['String'];
};

export type RoomInput = {
  availabilitySchedule?: InputMaybe<Array<Scalars['String']>>;
  roomNumber: Scalars['String'];
  roomType?: InputMaybe<RoomTypeInput>;
  status?: InputMaybe<Scalars['String']>;
};

export type RoomService = {
  __typename?: 'RoomService';
  orderRooms: Array<Scalars['String']>;
  serviceDescription: Scalars['String'];
  serviceName: Scalars['String'];
  servicePrice: Scalars['Float'];
};

export type RoomServiceInput = {
  orderRooms?: InputMaybe<Array<Scalars['String']>>;
  serviceDescription?: InputMaybe<Scalars['String']>;
  serviceName: Scalars['String'];
  servicePrice?: InputMaybe<Scalars['Float']>;
};

export type RoomType = {
  __typename?: 'RoomType';
  amountBed: Scalars['Float'];
  basePrice: Scalars['Float'];
  type: Scalars['String'];
};

export type RoomTypeInput = {
  amountBed?: InputMaybe<Scalars['Float']>;
  basePrice?: InputMaybe<Scalars['Float']>;
  type: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  createNews: Array<News>;
};

export type TableTimeInput = {
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Boolean']>;
};

export type TableTimeModel = {
  __typename?: 'TableTimeModel';
  key: Scalars['String'];
  value: Scalars['Boolean'];
};

export type TableTimesInput = {
  bookTimes?: InputMaybe<Array<TableTimeInput>>;
  date?: InputMaybe<Scalars['String']>;
};

export type TableTimesModel = {
  __typename?: 'TableTimesModel';
  bookTimes: Array<TableTimeModel>;
  date: Scalars['String'];
};

export type Tour = {
  __typename?: 'Tour';
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  tourName: Scalars['String'];
  tourPrice: Scalars['Float'];
};

export type TourInput = {
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  tourName: Scalars['String'];
  tourPrice?: InputMaybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  avatar: Image;
  email: Scalars['String'];
  login: Scalars['String'];
  password: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  subscribedOnNews?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
  avatar?: InputMaybe<ImageInput>;
  email?: InputMaybe<Scalars['String']>;
  login: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  subscribedOnNews?: InputMaybe<Scalars['Boolean']>;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  accessToken: Scalars['String'];
  email: Scalars['String'];
  login: Scalars['String'];
  refreshToken: Scalars['String'];
  role: Scalars['String'];
  subscribedOnNews: Scalars['Boolean'];
};
