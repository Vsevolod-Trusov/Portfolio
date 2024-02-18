import { object, string } from 'yup';

import { LENGTH_SIZES, VALIDATION_ERRORS } from './constants';

const signInValidationSchema = object().shape({
  email: string()
    .required(VALIDATION_ERRORS.EMAIL_REQUIRED)
    .email(VALIDATION_ERRORS.EMAIL_VALIDATION),
  password: string()
    .required(VALIDATION_ERRORS.PASSWORD_REQUIRED)
    .min(LENGTH_SIZES.PASSWORD_LENGTH, VALIDATION_ERRORS.PASSWORD_VALIDATION),
});

export default signInValidationSchema;
