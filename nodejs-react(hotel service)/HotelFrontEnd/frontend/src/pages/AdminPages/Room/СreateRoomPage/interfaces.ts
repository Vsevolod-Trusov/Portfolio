import { IForm } from '../../interfaces';
import { AnyAction } from 'redux';
import { Dispatch } from 'react';

export interface ICreateRoomForm extends IForm {
  creatingEntity: any;
  dispatch: Dispatch<AnyAction>;
  graphql: any;
  setAction: any;
  checkAndSend: any;
  successMessage: string;
  errorMessage: string;
  mockButton: string;
  data: any;
  isLoading: boolean;
  error?: any;
  title: string;
  setEntitySuccessAction: any;
  setEntityErrorAction: any;
}
