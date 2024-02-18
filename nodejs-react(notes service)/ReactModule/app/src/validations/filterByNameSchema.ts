import { object, string } from 'yup';

import { LENGTH_SIZES, VALIDATION_ERRORS } from './constants';

const filterByNameSchema = object().shape({
  title: string()
    .required(VALIDATION_ERRORS.TITLE_REQUIRED)
    .min(LENGTH_SIZES.NAMES_LENGTH, VALIDATION_ERRORS.TITLE_VALIDATION),
});

export default filterByNameSchema;
