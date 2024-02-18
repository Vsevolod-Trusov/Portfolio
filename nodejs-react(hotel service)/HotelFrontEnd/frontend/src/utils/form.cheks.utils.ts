import { formatDate } from './date.utils';

export const checkPrice = (price: string) => {
  if (!+price) {
    if (price.length === 0) return false;

    if (+price !== 0) return false;
  }

  return true;
};

export const checkDates = (start: any, end: any) => {
  if (new Date(start).getTime() < new Date(formatDate(Date.now())).getTime()) {
    return false;
  }

  if (new Date(start).getTime() > new Date(end).getTime()) {
    return false;
  }

  return true;
};
