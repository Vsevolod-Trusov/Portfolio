export const ROOM_COLUMNS = [
  {
    name: 'RoomNumber',
    selector: (row: any) => row.roomNumber,
    sortable: true,
    center: true,
  },
  {
    name: 'Type',
    selector: (row: any) => row.roomType.type,
    sortable: true,
    center: true,
  },
  {
    name: 'Price',
    selector: (row: any) => row.roomType.basePrice,
    sortable: true,
    center: true,
  },
  {
    name: 'Amount beds',
    selector: (row: any) => row.roomType.amountBed,
    sortable: true,
    center: true,
  },
];

export const ORDER_ROOM_COLUMNS = [
  {
    name: 'RoomNumber',
    selector: (row: any) => row.roomNumber,
    sortable: true,
    center: true,
  },
  {
    name: 'Type',
    selector: (row: any) => row.roomType,
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
    name: 'Amount people',
    selector: (row: any) => row.peopleAmount,
    sortable: true,
    center: true,
  },
  {
    name: 'Check in date',
    selector: (row: any) => row.checkInDate.slice(0, 10),
    sortable: true,
    center: true,
  },
  {
    name: 'Exit date',
    selector: (row: any) => row.exitDate.slice(0, 10),
    sortable: true,
    center: true,
  },
  {
    name: 'Service',
    selector: (row: any) =>
      row.roomServices.map(
        (service: string, index: string) => `${index}. ${service}\n\n`,
      ),
    center: true,
    wrap: true,
  },
  {
    name: 'User',
    selector: (row: any) => row.userLogin,
    center: true,
  },
];
