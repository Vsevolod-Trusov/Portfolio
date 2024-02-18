import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TableTimeInput {
  @Field({nullable: true})
  key: string
  @Field( {nullable: true})
  value: boolean;
}
