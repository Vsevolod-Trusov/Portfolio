import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { OrderRoom } from './order_room.model';
import { Field, ObjectType } from '@nestjs/graphql';

export type RoomServiceDocument = RoomService & Document;

@ObjectType()
@Schema({versionKey: false})
export class RoomService {
  @Field()
  @Prop({ required: true, type: MongooseSchema.Types.String, unique: true })
  serviceName: string;

  @Field()
  @Prop({ required: true })
  servicePrice: number;

  @Field()
  @Prop({ required: true, default: 'cool service' })
  serviceDescription: string;

  @Field(() => [String])
  @Prop({ type: [{ type: MongooseSchema.Types.String, ref: 'OrderRoom' }] })
  orderRooms: string[];
}

export const RoomServiceSchema = SchemaFactory.createForClass(RoomService);
