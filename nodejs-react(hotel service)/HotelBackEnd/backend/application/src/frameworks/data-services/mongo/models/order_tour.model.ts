import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type OrderTourDocument = OrderTour & Document

@ObjectType()
@Schema({versionKey: false})
export class OrderTour {
  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true})
  _id: MongooseSchema.Types.ObjectId;

  @Field(() =>  String)
  @Prop({ type:MongooseSchema.Types.String,  required: true})
  tourName: string;

  @Field()
  @Prop({ required: true, min: 1 })
  peopleAmount: number;

  @Field()
  @Prop({ required: true })
  orderPrice: number;

  @Field(() => Date)
  @Prop({ required: true, type: Date, default: new Date() })
  tourDate: Date;

  @Field(() => String)
  @Prop({type:MongooseSchema.Types.String, required: true})
  userLogin: string;
}

export const OrderTourSchema = SchemaFactory.createForClass(OrderTour);
