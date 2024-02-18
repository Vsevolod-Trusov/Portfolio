import { combineReducers } from 'redux';
//import { userReducer } from './user.reducer';
import { themeReducer } from './theme.reducer';
import { roomReducer } from './room.reducer';
import { mealReducer } from './meal.reducer';
import { tourReducer } from './tour.reducer';
import { newsReducer } from './news.reducer';
import { hobbyReducer } from './hobby.reducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
  room: roomReducer,
  meal: mealReducer,
  tour: tourReducer,
  news: newsReducer,
  hobbies: hobbyReducer,
});
