import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from './user.model';
import { Field, ObjectType } from '@nestjs/graphql';

export type FeedbackDocument = Feedback & Document

@ObjectType()
@Schema({versionKey: false})
export class Feedback {
  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.String})
  userLogin: string;
  @Field()
  @Prop({ required: true })
  review: string;
  @Field()
  @Prop({ required: true, min: 0, max: 5 })
  estimation: number;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
