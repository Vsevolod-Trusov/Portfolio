import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Image } from './image.model';
import { Schema as MongooseSchema } from 'mongoose';

export type NewsDocument = News & Document;

@ObjectType()
@Schema({versionKey: false})
export class News {
  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({default: 'News header'})
  newsHeader: string;

  @Field()
  @Prop({default: "News content"})
  newsContent: string;

  @Field()
  @Prop({default: new Image('image/path')})
  newsImage: Image;

  @Field(() => Date)
  @Prop({default: new Date()})
  newsDate: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News)
