import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class OrderMealInput {
  @Field(() => String, {nullable: true})
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [Int])
    mealsAmount: MongooseSchema.Types.Number[];

  @Field()
  orderPrice: number;

  @Field()
  inRoom: boolean;

  @Field(() => [String])
  meals: string[];

  @Field(() => String,{nullable: true})
  tableNumber: string;

  @Field({nullable: true})
  bookDate: string;

  @Field({nullable: true})
  bookTime: string;

  @Field(() => String, {nullable: true})
  userLogin: string;
}

