import { Dispatch, SetStateAction } from 'react';

export interface IForm {
  changeTab?: Dispatch<SetStateAction<string>>;
}
