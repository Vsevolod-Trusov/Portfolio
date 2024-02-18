import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { TableTimeInput } from './TableTime.input';

@InputType()
export class TableTimesInput {
  @Field({nullable: true})
  date: string
  @Field(() => [TableTimeInput], {nullable: true})
  bookTimes: TableTimeInput[];
}
