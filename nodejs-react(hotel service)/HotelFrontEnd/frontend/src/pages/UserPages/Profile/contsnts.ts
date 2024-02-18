import { formatDate } from '../../../utils/date.utils';

export const NEWS_COLUMNS = [
  {
    name: 'Title',
    selector: (row: any) => row.newsHeader,
    sortable: true,
    center: true,
  },

  {
    name: 'Description',
    selector: (row: any) => row.newsContent.slice(0, 20),
    center: true,
  },

  {
    name: 'Published',
    selector: (row: any) => formatDate(row.newsDate),
    sortable: true,
    center: true,
  },
];
