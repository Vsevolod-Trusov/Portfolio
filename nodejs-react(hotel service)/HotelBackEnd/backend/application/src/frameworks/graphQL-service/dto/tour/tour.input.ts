import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class TourInput {
  @Field()
  tourName: string;
  @Field({nullable: true})
  description: string;
  @Field(() => Date, {nullable: true})
  startDate: Date;
  @Field(() => Date, {nullable: true})
  endDate: Date;
  @Field({nullable: true})
  tourPrice: number;
}

@ObjectType()
export class Deleted {
  @Field()
  acknowledged: boolean;

  @Field()
  deletedCount: number
}

