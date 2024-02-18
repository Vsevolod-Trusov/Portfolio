import { createSlice } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_NAMES } from 'config/globalConstants';
import { INITIAL_USER_STATE } from 'pages/NoteList/constants';
import { RootState } from 'store/store';

export const userSlice = createSlice({
  name: LOCAL_STORAGE_NAMES.USER,
  initialState:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAMES.USER)) ||
    INITIAL_USER_STATE,
  reducers: {
    setUser: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const { setUser } = userSlice.actions;
export const selectFirstName = (state: RootState) => state.user.firstname;
export const selectEmail = (state: RootState) => state.user.email;

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
