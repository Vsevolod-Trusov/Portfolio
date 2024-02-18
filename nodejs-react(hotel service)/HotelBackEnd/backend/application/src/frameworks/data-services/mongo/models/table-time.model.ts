import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TableTimeModel {
  @Field()
  key: string
  @Field()
  value:boolean;
}
