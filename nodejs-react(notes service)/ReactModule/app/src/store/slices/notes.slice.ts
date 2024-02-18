import { createSlice } from '@reduxjs/toolkit';

import { INITIAL_STATE } from 'pages/NoteList/constants';
import { INITIAL_FILTER } from 'components/FilterNotes/constants';
import { LOCAL_STORAGE_NAMES } from 'config/globalConstants';
import { RootState } from 'store/store';

export const notesSlice = createSlice({
  name: LOCAL_STORAGE_NAMES.USER,
  initialState: {
    notes: [],
    postNotes: [],
    shared: [],
    selectedNote:
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAMES.SELECTED)) ||
      INITIAL_STATE,
    filter: INITIAL_FILTER,
  },
  reducers: {
    setNotes: (state, { payload }) => ({ ...state, notes: payload }),
    setPostNotes: (state, { payload }) => ({ ...state, postNotes: payload }),
    setShared: (state, { payload }) => ({ ...state, shared: payload }),
    setSelectedNote: (state, { payload }) => ({
      ...state,
      selectedNote: payload,
    }),
    setFilter: (state, { payload }) => ({ ...state, filter: payload }),
  },
});

export const {
  setNotes: setReduxNotes,
  setShared,
  setPostNotes,
  setSelectedNote,
  setFilter,
} = notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes.notes;
export const selectShared = (state: RootState) => state.notes.shared;
export const selectPostNotes = (state: RootState) => state.notes.postNotes;
export const selectNote = (state: RootState) => state.notes.selectedNote;
export const selectFilter = (state: RootState) => state.notes.filter;
export default notesSlice.reducer;
