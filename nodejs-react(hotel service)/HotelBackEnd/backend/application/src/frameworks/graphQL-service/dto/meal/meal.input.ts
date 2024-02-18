import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MealInput {
  @Field()
  mealName: string;
  @Field({nullable:  true})
  mealDescription: string;
  @Field({nullable:  true})
  mealPrice: number;
}

