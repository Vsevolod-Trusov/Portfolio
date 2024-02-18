import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HobbyUseCases } from '../../use-cases/hobby/hobby.use-cases';
import { FreeTimeInfo } from '../../frameworks/data-services/mongo/models/free_time_info';
import { FreeTimeInfoInput } from '../../frameworks/graphQL-service/dto/hobby/hobby.input';
import { RoomInput } from '../../frameworks/graphQL-service/dto/room/room.input';
import { RoomUseCases } from 'src/use-cases/room/room.use-case';
import { Room } from '../../frameworks/data-services/mongo/models/room.model';
import { RoomServiceInput } from '../../frameworks/graphQL-service/dto/room/room-service.input';
import { RoomService } from '../../frameworks/data-services/mongo/models/room_service';
import { OrderRoom, OrderRoomDocument } from '../../frameworks/data-services/mongo/models/order_room.model';
import { OrderRoomInput } from '../../frameworks/graphQL-service/dto/room/order-room.input';
import { RoomTypeInput } from '../../frameworks/graphQL-service/dto/room/room-type.input';
import { RoomType } from '../../frameworks/data-services/mongo/models/room_type.model';
import { Roles } from '../../frameworks/auth/services/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth/services/jwt-auth.guard';
import { RoleGuard } from '../../frameworks/auth/services/role.guard';
import { Deleted } from '../../frameworks/graphQL-service/dto/tour/tour.input';

@Resolver()
export class RoomGraphResolver {
  constructor(private roomUseCases: RoomUseCases) {
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Room)
  createRoom(@Args('createRoom') roomInput: RoomInput): Promise<Room>{
    return  this.roomUseCases.createRoom(roomInput)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [RoomType])
  async getRoomTypesToBook(@Args('startDate') startDate: string,
                    @Args('finishDate') finishDate: string,
                    @Args('adultsAmount') adultsAmount: string): Promise<RoomType[]> {
    return await this.roomUseCases.getRoomTypesToBook(startDate, finishDate, +adultsAmount)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => RoomService)
  async createRoomService(@Args('createRoomService') roomServiceInput: RoomServiceInput): Promise<RoomService>{
    return await this.roomUseCases.createRoomService(roomServiceInput)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [RoomService])
  async getAllRoomServices(): Promise<RoomService[]> {
    return await this.roomUseCases.getAllRoomServices()
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => RoomService)
  async updateRoomService(@Args('service') service: RoomServiceInput): Promise<RoomService> {
    return await this.roomUseCases.updateRoomService(service)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneRoomService(@Args('serviceName') name: string): Promise<Deleted> {
    return await this.roomUseCases.deleteOneRoomService(name)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => OrderRoom)
  async createOrderRoom(@Args('createOrderRoom') orderRoom: OrderRoomInput, @Args('token') token: string): Promise<OrderRoom>{
    return await this.roomUseCases.createOrderRoom(orderRoom, token)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [OrderRoom])
  async getAllOrderRooms(): Promise<OrderRoom[]> {
    return await this.roomUseCases.getAllOrderRooms()
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneOrderRoom(@Args('orderId') id: string): Promise<Deleted> {
    return await this.roomUseCases.deleteOneOrderRoom(id)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Room)
  async updateOneRoom(@Args('room') room: RoomInput): Promise<Room> {
    return await this.roomUseCases.updateOneRoom(room)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneRoom(@Args('name') name: string): Promise<Deleted> {
    return await this.roomUseCases.deleteOneRoom(name)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [Room])
  async getAllRooms(): Promise<Room[]> {
    return await this.roomUseCases.getAllRooms()
  }

}
