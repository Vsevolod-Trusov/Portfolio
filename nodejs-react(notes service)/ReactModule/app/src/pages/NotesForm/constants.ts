import { EMPTY_LINE } from 'pages/NoteList/constants';
import { INotesValues } from './types';

export const TITLE_FIELD = 'title';
export const DATE_CREATION_FIELD = 'dateCreation';
export const DESCRIPTION_FIELD = 'description';
export const TITLE_PLACEHOLDER = 'Enter title';
export const DESCRIPTION_PLACEHOLDER = 'Enter description';
export const BUTTON_TEXT = 'Create';
export const DATA_FORM_ID = 'notes-form';
export const NOTE_INITIAL_VALUES: INotesValues = {
  id: EMPTY_LINE,
  title: EMPTY_LINE,
  dateCreation: EMPTY_LINE,
  description: EMPTY_LINE,
  author: EMPTY_LINE,
};
