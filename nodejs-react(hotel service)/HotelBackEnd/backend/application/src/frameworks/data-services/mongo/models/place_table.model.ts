import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { TableTimesInput } from '../../../graphQL-service/dto/meal/TableTimesInput';
import { TableTimesModel } from './table-times.model';

export type PlaceTableDocument = PlaceTable & Document

@ObjectType()
@Schema({versionKey: false})
export class PlaceTable {
  @Field()
  @Prop({ required: true, unique: true, type: MongooseSchema.Types.String })
  tableNumber: string;
  @Field()
  @Prop({ required: true, enum: ['free', 'busy'], default: 'free'})
  status: string;
  @Field()
  @Prop({ required: true, enum: [2,4] })
  amountSeats: number;

  @Field(() => [TableTimesModel])
  @Prop()
  availabilitySchedule: TableTimesModel[];
}

export const PlaceTableSchema = SchemaFactory.createForClass(PlaceTable);
