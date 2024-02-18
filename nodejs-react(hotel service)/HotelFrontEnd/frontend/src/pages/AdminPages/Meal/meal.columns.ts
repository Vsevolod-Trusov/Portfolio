export const MEAL_COLUMNS = [
  {
    name: 'Name',
    selector: (row: any) => row.mealName,
    sortable: true,
    center: true,
  },

  {
    name: 'Price',
    selector: (row: any) => row.mealPrice,
    sortable: true,
    center: true,
  },
];
export const ORDER_MEAL_COLUMNS = [
  {
    name: 'User',
    selector: (row: any) => row.userLogin,
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
    name: 'Meals',
    selector: (row: any) =>
      row.meals.map(
        (meal: string, index: string) => `${meal}(${row.mealsAmount[index]}); `,
      ),
    center: true,
    wrap: true,
  },

  {
    name: 'InRoom',
    selector: (row: any) => (row.inRoom ? 'yes' : 'no'),
    sortable: true,
    center: true,
  },

  {
    name: 'Table',
    selector: (row: any) => (row.inRoom ? '-' : row.tableNumber),
    sortable: true,
    center: true,
  },

  {
    name: 'Date',
    selector: (row: any) => row.bookDate,
    sortable: true,
    center: true,
  },

  {
    name: 'Time',
    selector: (row: any) => (row.inRoom ? '-' : row.bookTime),
    sortable: true,
    center: true,
  },
];
