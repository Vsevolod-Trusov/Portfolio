import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { TableTimeModel } from './table-time.model';

@ObjectType()
export class TableTimesModel {
  @Field()
  date: string
  @Field(() => [TableTimeModel])
  bookTimes:TableTimeModel[];
}
