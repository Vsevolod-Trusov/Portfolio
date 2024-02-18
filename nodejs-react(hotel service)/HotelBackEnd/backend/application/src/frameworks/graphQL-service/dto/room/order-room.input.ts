import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class OrderRoomInput {
  @Field(() => String, {nullable: true})
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, {nullable: true})
  roomNumber: string;

  @Field(() => String)
  roomType: string;

 /* @Field({nullable: true})
  roomAmount: number;*/

  @Field({nullable: true})
  peopleAmount: number;

  @Field(() => Date, {nullable: true})
  checkInDate: Date;

  @Field(() => Date, {nullable: true})
  exitDate: Date;

  @Field(() => [String], {nullable: true})
  roomServices: string[];

  @Field({nullable: true})
  orderPrice: number;

  @Field(() => String, {nullable: true})
  userLogin: string;
}

