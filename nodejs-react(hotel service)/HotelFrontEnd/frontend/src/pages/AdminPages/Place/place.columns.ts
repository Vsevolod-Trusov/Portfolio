export const TABLES_COLUMNS = [
  {
    name: 'Number',
    selector: (row: any) => row.tableNumber,
    sortable: true,
    center: true,
  },

  {
    name: 'Amount',
    selector: (row: any) => row.amountSeats,
    sortable: true,
    center: true,
  },
];
