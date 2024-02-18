import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from './user.model';
import { Meal } from './meal.model';
import { PlaceTable } from './place_table.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export type OrderMealDocument = OrderMeal & Document

@ObjectType()
@Schema({versionKey: false})
export class OrderMeal {
  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [Int])
  @Prop({ required: true })
  mealsAmount: MongooseSchema.Types.Number[];

  @Field()
  @Prop({ required: true })
  orderPrice: number;

  @Field()
  @Prop({ required: true })
  inRoom: boolean;

  @Field(() => [String])
  @Prop()
  meals: string[];

  @Field(() => String, {nullable: true})
  @Prop()
  tableNumber: string;

  @Field(() => String, {nullable: true})
  @Prop()
  bookDate: string;

  @Field(() => String, {nullable: true})
  @Prop()
  bookTime: string;

  @Field(() => String)
  @Prop()
  userLogin: string ;
}

export const OrderMealSchema = SchemaFactory.createForClass(OrderMeal);
