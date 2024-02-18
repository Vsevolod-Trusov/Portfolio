import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type FreeTimeInfoDocument = FreeTimeInfo & Document

@ObjectType()
@Schema({versionKey: false})
export class FreeTimeInfo {
  @Field()
  @Prop({ required: true, unique: true })
  leisureName: string;
  @Field()
  @Prop({ required: true, default: 'cool place' })
  description: string;
  @Field({nullable: true})
  @Prop({ default: null })
  price: number;
}

export const FreeTimeInfoSchema = SchemaFactory.createForClass(FreeTimeInfo);
