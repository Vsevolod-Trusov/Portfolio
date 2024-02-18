import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FreeTimeInfoInput {
  @Field()
  leisureName: string;
  @Field({nullable: true})
  description: string;
  @Field({nullable: true})
  price: number;
}

