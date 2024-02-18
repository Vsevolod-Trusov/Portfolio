import { Injectable } from '@nestjs/common';
import { FreeTimeInfo } from '../../frameworks/data-services/mongo/models/free_time_info';
import { FreeTimeInfoInput } from '../../frameworks/graphQL-service/dto/hobby/hobby.input';
import { IDataServices } from '../../core/contracts/data-service.contract';
import { Deleted } from '../../frameworks/graphQL-service/dto/tour/tour.input';

@Injectable()
export class HobbyUseCases {
  constructor(
    private dataService: IDataServices,
  ) {
  }

  async createHobby(hobby: FreeTimeInfoInput): Promise<FreeTimeInfo> {
    try {
      return await this.dataService.hobbies.create(hobby);
    } catch (error) {
      throw error;
    }
  }

  async getAllHobbies(): Promise<FreeTimeInfo[]> {
    try {
      return await this.dataService.hobbies.getAll();
    } catch (error) {
      throw error;
    }
  }

  async changeHobbyPrice(changedHobby: FreeTimeInfoInput): Promise<FreeTimeInfo> {
    try {
      await this.dataService.hobbies.update({leisureName: changedHobby.leisureName}, changedHobby)
      return await this.dataService.hobbies.findOneByParameters({leisureName: changedHobby.leisureName});
    } catch (error) {
      throw error;
    }
  }

  async deleteOneHobby(name: string): Promise<Deleted> {
    try {
      return await this.dataService.hobbies.deleteOne({leisureName: name});
    } catch (error) {
      throw error;
    }
  }
}
