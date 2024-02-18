export const ROOM_TYPES_COLUMNS = [
  {
    name: 'Type',
    selector: (row: any) => row.type,
    sortable: true,
    center: true,
  },

  {
    name: 'Price/Night',
    selector: (row: any) => row.basePrice,
    sortable: true,
    center: true,
  },
];
