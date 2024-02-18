import React, { Dispatch, SetStateAction } from 'react';
import { AnyAction } from 'redux';
import { IForm } from '../interfaces';

export interface IChangingTable {
  tableNumber: string;
  amountSeats: string;
}

export interface IChangeTableForm extends IForm {
  selectedEntity: any;
  mock: string;
  dispatch: Dispatch<AnyAction>;
  setAction: any;
  graphqlDelete: any;
  checkAndSend: any;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export interface ICreateTableForm extends IForm {
  creatingEntity: any;
  dispatch: Dispatch<AnyAction>;
  setAction: any;
  graphql: any;
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

export interface ICheckAndSendTableProps {
  tableNumber: string;
  amountSeats: string;
  dispatch: Dispatch<AnyAction>;
  graphql: any;
  refetch: any;
  checkAndSend: any;
  changeTab: Dispatch<SetStateAction<string>>;
}
