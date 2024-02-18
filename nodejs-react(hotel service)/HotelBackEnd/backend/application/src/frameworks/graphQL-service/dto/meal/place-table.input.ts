import { Field, InputType} from '@nestjs/graphql';
import { TableTimesModel } from '../../../data-services/mongo/models/table-times.model';
import { TableTimesInput } from './TableTimesInput';

@InputType()
export class PlaceTableInput {
  @Field()
  tableNumber: string;
  @Field({nullable: true})
  status: string;
  @Field({nullable: true})
  amountSeats: number;

  @Field(() => [TableTimesInput], {nullable: true})
  availabilitySchedule: TableTimesInput[];
}

