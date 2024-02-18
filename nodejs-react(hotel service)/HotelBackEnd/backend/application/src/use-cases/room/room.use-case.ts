import { BadRequestException, Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/contracts/data-service.contract';
import { RoomInput } from '../../frameworks/graphQL-service/dto/room/room.input';
import { Room } from '../../frameworks/data-services/mongo/models/room.model';
import { RoomService } from '../../frameworks/data-services/mongo/models/room_service';
import { RoomServiceInput } from '../../frameworks/graphQL-service/dto/room/room-service.input';
import { OrderRoom } from '../../frameworks/data-services/mongo/models/order_room.model';
import { OrderRoomInput } from '../../frameworks/graphQL-service/dto/room/order-room.input';
import { RoomType } from '../../frameworks/data-services/mongo/models/room_type.model';
import { Schema as MongooseSchema } from 'mongoose';
import { Deleted } from '../../frameworks/graphQL-service/dto/tour/tour.input';
import { BADRESP } from 'dns';
import { AuthService } from '../../frameworks/auth/services/auth.service';

export function getMonth(inputDate: any) {
  const date = new Date(inputDate);

  const month = ('0' + (date.getMonth() + 1)).slice(-2); // add leading zero if necessary
  return month;
}

export function getDay(inputDate: any) {
  const date = new Date(inputDate);

  const day = ('0' + date.getDate()).slice(-2); // add leading zero if necessary
  return day;
}


export function getDays(startDate: string, finishDate: string): number {
  const start = new Date(startDate);
  const end = new Date(finishDate);
  const timeDiff = Math.abs(start.getTime() - end.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}


@Injectable()
export class RoomUseCases {
  constructor(
    private dataService: IDataServices,
    private readonly authService: AuthService
  ) {
  }

  private blockDates(room, checkInDate, checkOutDate): Room {
    const start = new Date(checkInDate);
    const days = getDays(checkInDate, checkOutDate);

    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);

      const dateString = new Date(date).toISOString().slice(0, 10);
      room.availabilitySchedule[0].set(dateString, false);
    }

    return room;
  }

  private unlockDates(room, checkInDate, checkOutDate): Room {
    const start = new Date(checkInDate);
    const days = getDays(checkInDate, checkOutDate);

    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);

      const dateString = new Date(date).toISOString().slice(0, 10);
      room.availabilitySchedule[0].set(dateString, true);
    }

    return room;
  }

  private generateAvailabilitySchedule(checkInDate: string, checkOutDate: string): Map<string, boolean> {
    const start = new Date(checkInDate);
    const days = getDays(checkInDate, checkOutDate);

    const schedule = new Map<string, boolean>();
    for (let i = 0; i <= days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      const dateString = new Date(date).toISOString().slice(0, 10);

      schedule.set(dateString, true);
    }
    return schedule;
  }

  private isRoomAvailable(room, checkInDate, checkOutDate) {
    const availabilitySchedule = room.availabilitySchedule; // Assuming availabilitySchedule is a list of dates
    const currentDate = new Date(checkInDate);
    while (currentDate <= new Date(checkOutDate)) {
      if (!availabilitySchedule[0].get(currentDate.toISOString().slice(0, 10))) {
        return false;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return true;
  }

  private checkIsAvailableRoomTypes(startDate: string, finishDate: string, adultsAmount: number, rooms: Room[]): RoomType[] {

    let outputRoomTypes: RoomType[] = [];

    for (const room of rooms) {

      if (this.isRoomAvailable(room, startDate, finishDate)) {
        const freeBeds = room.roomType.amountBed - adultsAmount;
        if (!outputRoomTypes.find(item => item.type === room.roomType.type) && freeBeds >= 0)
          outputRoomTypes.push(room.roomType);
      }
    }

    return outputRoomTypes;
  }

  createRoom(room: RoomInput): Promise<Room> {
    try {
      const BOOK_DURATION = 3;
      const startDate = new Date();
      const finishDate = new Date(`${startDate.getFullYear()}-${+getMonth(startDate) + BOOK_DURATION}-${getDay(startDate)}`);
      room.availabilitySchedule = this.generateAvailabilitySchedule(startDate.toString(), finishDate.toString());

      return this.dataService.rooms.create(room);
    } catch (error) {
      throw error;
    }
  }

  async getRoomTypesToBook(startDate: string, finishDate: string, adultsAmount: number): Promise<RoomType[]> {
    try {
      const rooms = await this.dataService.rooms.getAll();
      return this.checkIsAvailableRoomTypes(startDate, finishDate, adultsAmount, rooms);
    } catch (error) {
      throw error;
    }
  }

  getAllRooms(): Promise<Room[]> {
    try {
      return this.dataService.rooms.getAll();
    } catch (error) {
      throw error;
    }
  }

  async createRoomService(roomService: RoomServiceInput): Promise<RoomService> {
    try {
      return this.dataService.roomServices.create(roomService);
    } catch (error) {
      throw error;
    }
  }

  async getAllRoomServices(): Promise<RoomService[]> {
    try {
      return this.dataService.roomServices.getAll();
    } catch (error) {
      throw error;
    }
  }

  async createOrderRoom(orderRoom: OrderRoomInput, token: string): Promise<OrderRoom> {
    try {
      const {login} = await this.authService.getRoleAndLoginByAccessToken(token)

      const existingUser = await this.dataService.users.findOneByParameters({login: login})

      if (!existingUser) {
        throw new BadRequestException('Login not defined')
      }

      orderRoom.userLogin = existingUser.login

      const rooms = await this.dataService.rooms.getAll();

      const necessaryRooms = rooms.filter((item: Room) => item.roomType.type === orderRoom.roomType.toString() && item.roomType.amountBed - orderRoom.peopleAmount >= 0);

      const bookRoom = necessaryRooms.find((item: Room) => this.isRoomAvailable(item, orderRoom.checkInDate, orderRoom.exitDate));

      const changedRoom = await this.blockDates(bookRoom, orderRoom.checkInDate, orderRoom.exitDate);

      await this.dataService.rooms.update({ roomNumber: bookRoom.roomNumber }, changedRoom);

      orderRoom.roomNumber = bookRoom.roomNumber;
      return this.dataService.orderRooms.create(orderRoom);
    } catch (error) {
      throw error;
    }
  }

  async deleteOneOrderRoom(id: string): Promise<Deleted> {
    try {
      const orderRoom = await this.dataService.orderRooms.findOneByParameters({ _id: id });

      const room = await this.dataService.rooms.findOneByParameters({ roomNumber: orderRoom.roomNumber });

      if (!room) {
        return this.dataService.orderRooms.deleteOne({ _id: id });
      }
      const unlockRoom = await this.unlockDates(room, orderRoom.checkInDate, orderRoom.exitDate);

      await this.dataService.rooms.update({ roomNumber: unlockRoom.roomNumber }, unlockRoom);

      return this.dataService.orderRooms.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }


  async getAllOrderRooms(): Promise<OrderRoom[]> {
    try {
      return await this.dataService.orderRooms.getAll();
    } catch (error) {
      throw error;
    }
  }

  async updateOneRoom(room: RoomInput): Promise<Room> {
    try {

      await this.dataService.rooms.update({ roomNumber: room.roomNumber }, room);
      return await this.dataService.rooms.findOneByParameters({ roomNumber: room.roomNumber });

    } catch (error) {
      throw error;
    }
  }

  async updateRoomService(service: RoomServiceInput): Promise<RoomService> {
    try {

      await this.dataService.roomServices.update({ serviceName: service.serviceName }, service);
      return await this.dataService.roomServices.findOneByParameters({ serviceName: service.serviceName });

    } catch (error) {
      throw error;
    }
  }

  async deleteOneRoomService(name: string): Promise<Deleted> {
    try {

      return await this.dataService.roomServices.deleteOne({ serviceName: name });
    } catch (error) {
      throw error;
    }
  }

  async deleteOneRoom(name: string): Promise<Deleted> {
    try {
      /*const roomOrders = await this.dataService.orderRooms.findByParameters({roomNumber: name });

      for (const order of roomOrders) {
        await this.dataService.orderRooms.deleteOne({_id: order._id})
      }*/

      return this.dataService.rooms.deleteOne({ roomNumber: name });
    } catch (error) {
      throw error;
    }
  }

}
