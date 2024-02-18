import { configureStore } from '@reduxjs/toolkit';

import { default as userReducer } from './slices/user.slice';
import { default as notesReducer } from './slices/notes.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
