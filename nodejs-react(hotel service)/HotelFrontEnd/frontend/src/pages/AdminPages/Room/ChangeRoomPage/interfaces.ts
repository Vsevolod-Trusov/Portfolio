export interface IChangingRoom {
  roomNumber: string;
  roomType: IRoomType;
}

export interface IRoomType {
  basePrice: string;
  amountBed: string;
  type: string;
}
