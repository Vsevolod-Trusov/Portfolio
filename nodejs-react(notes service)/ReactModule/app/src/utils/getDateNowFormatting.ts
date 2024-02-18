import { DATE_DEVIDER, ZERO_VALUE, TIME_PART } from './constants';

const getDateNowFormatting = () =>
  new Date(
    new Date(Date.now()).toISOString().split(DATE_DEVIDER)[ZERO_VALUE] +
      TIME_PART,
  );

export default getDateNowFormatting;
