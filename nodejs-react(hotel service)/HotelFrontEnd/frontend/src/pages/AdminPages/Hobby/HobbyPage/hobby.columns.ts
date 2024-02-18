export const HOBBY_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.leisureName,
    sortable: true,
    center: true,
  },

  {
    name: 'Price',
    selector: (row: any) => row.price,
    sortable: true,
    center: true,
  },
];
