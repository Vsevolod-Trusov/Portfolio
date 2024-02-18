import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { ImageInput } from '../user/image.input';

@InputType()
export class NewsInput {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field({ nullable: true })
  newsHeader: string;

  @Field({ nullable: true })
  newsContent: string;

  @Field(() => ImageInput, { nullable: true })
  newsImage: ImageInput;

  @Field(() => Date, { nullable: true })
  newsDate: Date;
}
