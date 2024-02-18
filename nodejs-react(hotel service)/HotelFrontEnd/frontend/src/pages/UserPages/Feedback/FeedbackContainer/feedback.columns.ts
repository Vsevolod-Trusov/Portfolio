export const FEEDBACK_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.userLogin,
    sortable: true,
    center: true,
  },

  {
    name: 'Review',
    selector: (row: any) => row.review.slice(0, 20),
    center: true,
  },

  {
    name: 'Estimation',
    selector: (row: any) => row.estimation,
    center: true,
  },
];
