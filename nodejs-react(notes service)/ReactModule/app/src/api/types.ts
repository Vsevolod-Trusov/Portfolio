import { AxiosError } from 'axios';

import { TNote } from 'pages/NoteList/types';

interface IResponseError {
  message: string;
  statusCode: number;
  success: boolean;
}

export interface INoteResponse {
  notes: TNote[];
}
export interface IFilterData {
  dateCreation?: string;
  title?: string;
}

export type TResponseError = AxiosError<IResponseError>;
