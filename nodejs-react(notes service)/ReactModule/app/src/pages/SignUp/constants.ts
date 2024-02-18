import { EMPTY_LINE } from 'pages/NoteList/constants';

import { ISignUpForm } from './types';

export const SIGNUP_VALUES: ISignUpForm = {
  firstname: EMPTY_LINE,
  lastname: EMPTY_LINE,
  birthday: EMPTY_LINE,
  email: EMPTY_LINE,
  password: EMPTY_LINE,
  confirmPassword: EMPTY_LINE,
};

export const FIRST_NAME_FIELD = 'firstname';
export const LAST_NAME_FIELD = 'lastname';
export const BIRTHDAY_FIELD = 'birthday';
export const CONFIRM_PASSWORD_FIELD = 'confirmPassword';
export const CONFIRM_PASSWORD_PLACEHOLDER = 'Confirm password';
export const SUBMIT_BUTTON = 'Sign Up';
export const FIRSTNAME_PLACEHOLDER = 'Enter first name';
export const LASTNAME_PLACEHOLDER = 'Enter last name';
export const TITLE = 'Sign Up';
