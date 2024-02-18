import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class FeedbackInput {
  @Field(() => String, {nullable: true})
  userLogin: string;
  @Field()
  review: string;
  @Field()
  estimation: number;
}

