import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Room } from './room.model';
import { User } from './user.model';
import { RoomService } from './room_service';
import { Field, ObjectType } from '@nestjs/graphql';

export type OrderRoomDocument = OrderRoom & Document;

@ObjectType()
@Schema({versionKey: false})
export class OrderRoom {
  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  roomNumber:string;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.String })
  roomType: string;

  /*@Field()
  @Prop({ required: true, min: 1 }) //TODO:подумать можнет ли один пользователь забронировать несколько комнат
  roomAmount: number;*/

  @Field()
  @Prop({ required: true, min: 1 })
  peopleAmount: number;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  checkInDate: Date;

  @Field(() => Date)
  @Prop({ type: Date, required: true })
  exitDate: Date;

  @Field(() => [String])
  @Prop()
  roomServices: string[];

  @Field()
  @Prop({ required: true })
  orderPrice: number;

  @Field(() => String)
  @Prop()
  userLogin: string;
}

export const OrderRoomSchema = SchemaFactory.createForClass(OrderRoom);
