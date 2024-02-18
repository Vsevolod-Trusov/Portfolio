import { FORMAT_DATE } from './constants';

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(
    FORMAT_DATE.DAY_START_POSITION,
    FORMAT_DATE.ZERO,
  );
  const month = String(date.getMonth() + FORMAT_DATE.ADD_DATE_VALUE).padStart(
    FORMAT_DATE.DAY_START_POSITION,
    FORMAT_DATE.ZERO,
  );
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export default formatDate;
