export const ROOM_SERVICE_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.serviceName,
    sortable: true,
    center: true,
  },

  {
    name: 'Price',
    selector: (row: any) => row.servicePrice,
    sortable: true,
    center: true,
  },
];
