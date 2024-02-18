export enum VALIDATION_ERRORS {
  EMAIL_REQUIRED = 'Email is required',
  EMAIL_VALIDATION = 'Email is not valid',
  PASSWORD_REQUIRED = 'Password is required',
  PASSWORD_VALIDATION = 'Min 8 characters',
  FIRST_NAME_REQUIRED = 'First name is required',
  FIRST_NAME_VALIDATION = 'Min 3 characters',
  LAST_NAME_VALIDATION = 'Min 3 characters',
  LAST_NAME_REQUIRED = 'Last name is required',
  BIRTHDAY_REQUIRED = 'Birthday is required',
  BIRTHDAY_VALIDATION = 'Birthday is not valid',
  CONFIRM_PASSWORD = 'Confirm password',
  PASSWORD_NOT_EQUAL = "Passwords aren't equal",
  TITLE_REQUIRED = 'Title required',
  TITLE_VALIDATION = 'Min title length: 3',
  DATE_CREATION_REQUIRED = 'Date creation is required',
  DATE_CREATION_VALIDATION = 'Date creation is invalid',
  DESCRIPTION_REQUIRED = 'Description is required',
  DESCRIPTION_INVALID = 'Min description length: 3',
}
export enum LENGTH_SIZES {
  NAMES_LENGTH = 3,
  PASSWORD_LENGTH = 8,
}
