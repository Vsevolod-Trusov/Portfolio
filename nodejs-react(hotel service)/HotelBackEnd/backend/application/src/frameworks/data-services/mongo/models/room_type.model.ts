import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type RoomTypeDocument = RoomType & Document;

@ObjectType()
export class RoomType {

  constructor(_type: string, _basePrice: number, _amountBed: number) {
    this.type = _type;
    this.basePrice = _basePrice;
    this.amountBed = _amountBed;
  }

  @Field()
  type: string;
  @Field()
  basePrice: number;
  @Field()
  amountBed: number;
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);
