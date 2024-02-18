import { EMPTY_LINE } from 'pages/NoteList/constants';

import { IFilterValues } from './types';

export const FILTER_VALUES: IFilterValues = {
  dateCreation: EMPTY_LINE,
};
export const INITIAL_FILTER = {
  type: EMPTY_LINE,
  value: EMPTY_LINE,
};
export enum FILTER_TYPES {
  TITLE = 'title',
  DATE = 'date',
}
export const FILTER_BY_NAME_VALUES: IFilterValues = {
  title: EMPTY_LINE,
};
export const DATE_CREATION = 'dateCreation';
export const TITLE = 'title';
export const START_TIMEOUT = 10;
export const FILTER_FIELD = 'filter';
