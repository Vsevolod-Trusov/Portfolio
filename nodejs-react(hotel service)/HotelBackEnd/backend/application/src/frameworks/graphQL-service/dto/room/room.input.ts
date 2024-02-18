import { Field, InputType} from '@nestjs/graphql';
import { RoomTypeInput } from './room-type.input';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

@InputType()
export class RoomInput {

  @Field()
  roomNumber: string;

  @Field(() => RoomTypeInput, {nullable: true})
  roomType: RoomTypeInput;

  @Field({nullable: true})
  status: string;

  @Field(() => [String], {nullable: true})
  availabilitySchedule: Map<string, boolean>;

}

