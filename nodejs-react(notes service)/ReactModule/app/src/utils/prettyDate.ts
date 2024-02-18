import { FORMAT_DATE, ZERO_VALUE, BACK_SLICE_POSITION } from './constants';

const getPrettyDate = (date: Date) => {
  const day = String(date.getDate()).padStart(
    FORMAT_DATE.DAY_START_POSITION,
    FORMAT_DATE.ZERO,
  );

  const weekDay = date.toString().slice(ZERO_VALUE, BACK_SLICE_POSITION);

  return `${day} ${weekDay}`;
};
export default getPrettyDate;
