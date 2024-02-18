import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomTypeInput {
  @Field()
  type: string;
  @Field({nullable: true})
  basePrice: number;
  @Field({nullable: true})
  amountBed: number;
}
