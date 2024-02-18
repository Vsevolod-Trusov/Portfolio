import { PAGE_ELEMENTS_LIMIT, INCREMENT_VALUE } from 'api/constants';

const isThereNextPage = (
  currentPageLength: number,
  isCurrentPageLength: boolean,
  allPagesLength: number,
) =>
  currentPageLength < PAGE_ELEMENTS_LIMIT
    ? false
    : isCurrentPageLength
    ? false
    : allPagesLength + INCREMENT_VALUE;

export default isThereNextPage;
