import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
export type TourDocument = Tour & Document

@ObjectType()
@Schema({versionKey: false})
export class Tour {
  @Field()
  @Prop({ required: true, unique: true })
  tourName: string;

  @Field()
  @Prop({ required: true, default: 'cool tour' })
  description: string;

  @Field(() => Date)
  @Prop({ required: true, type: Date, default: new Date() })
  startDate: Date;

  @Field(() => Date)
  @Prop({ required: true, type: Date, default: new Date() })
  endDate: Date;

  @Field()
  @Prop({ required: true })
  tourPrice: number;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
