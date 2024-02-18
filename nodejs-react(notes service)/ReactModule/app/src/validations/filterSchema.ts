import { date, object } from 'yup';

import { VALIDATION_ERRORS } from './constants';

const filterSchema = object().shape({
  dateCreation: date().required(VALIDATION_ERRORS.DATE_CREATION_REQUIRED),
});

export default filterSchema;
