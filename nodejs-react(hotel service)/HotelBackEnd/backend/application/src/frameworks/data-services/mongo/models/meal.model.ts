import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type MealDocument = Meal & Document

@ObjectType()
@Schema({versionKey: false})
export class Meal {
  @Field()
  @Prop({ required: true, type: MongooseSchema.Types.String, unique: true })
  mealName: string;
  @Field()
  @Prop({ required: true })
  mealDescription: string;
  @Field()
  @Prop({ required: true })
  mealPrice: number;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
