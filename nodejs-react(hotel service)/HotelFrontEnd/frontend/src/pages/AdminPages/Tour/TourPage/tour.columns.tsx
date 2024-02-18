export const TOUR_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.tourName,
    sortable: true,
    center: true,
  },

  {
    name: 'Start',
    selector: (row: any) => row.startDate.slice(0, 10),
    sortable: true,
    center: true,
  },

  {
    name: 'Finish',
    selector: (row: any) => row.endDate.slice(0, 10),
    sortable: true,
    center: true,
  },

  {
    name: 'Price',
    selector: (row: any) => row.tourPrice,
    sortable: true,
    center: true,
  },
];
export const ORDER_TOUR_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.tourName,
    sortable: true,
    center: true,
  },

  {
    name: 'Amount',
    selector: (row: any) => row.peopleAmount,
    sortable: true,
    center: true,
  },

  {
    name: 'Date',
    selector: (row: any) => row.tourDate.slice(0, 10),
    sortable: true,
    center: true,
  },

  {
    name: 'Price',
    selector: (row: any) => row.orderPrice,
    sortable: true,
    center: true,
  },

  {
    name: 'User',
    selector: (row: any) => row.userLogin,
    sortable: true,
    center: true,
  },
];
