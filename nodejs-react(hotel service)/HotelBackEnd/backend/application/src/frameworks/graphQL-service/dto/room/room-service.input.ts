import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class RoomServiceInput {
  @Field()
  serviceName: string;

  @Field( {nullable: true})
  servicePrice: number;

  @Field( {nullable: true})
  serviceDescription: string;

  @Field(() => [String], {nullable: true})
  orderRooms: string[];
}

