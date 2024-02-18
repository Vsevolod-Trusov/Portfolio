import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoomType } from './room_type.model';
import {Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type RoomDocument = Room & Document;

@ObjectType()
@Schema({versionKey: false})
export class Room {

  @Field()
  @Prop({required: true, type:  MongooseSchema.Types.String, unique: true})
  roomNumber: string;

  @Field(() => RoomType)
  @Prop({required: true})
  roomType: RoomType; //standard //suite //deluxe

  @Field()
  @Prop({required: true, enum: ['busy', 'free'], default: 'free'})
  status: string;

  @Field(() => [String])
  @Prop({ type: [MongooseSchema.Types.Map] }) //TODO: FIX [MongooseSchema.Types.Map] -> MongooseSchema.Types.Map
  availabilitySchedule: Map<string, boolean>;
}

export const RoomSchema = SchemaFactory.createForClass(Room)
