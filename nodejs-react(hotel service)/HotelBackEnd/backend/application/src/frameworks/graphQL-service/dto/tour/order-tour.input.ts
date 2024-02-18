import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class OrderTourInput {
  @Field(() => String, {nullable: true})
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, {nullable: true})
  tourName: string;

  @Field({nullable: true})
  peopleAmount: number;

  @Field(() => Date, {nullable: true})
  tourDate: Date;

  @Field({nullable: true})
  orderPrice: number;

  @Field( () => String,{nullable: true})
  userLogin: string
}

