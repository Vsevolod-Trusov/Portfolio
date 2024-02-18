import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HobbyUseCases } from '../../use-cases/hobby/hobby.use-cases';
import { FreeTimeInfo } from '../../frameworks/data-services/mongo/models/free_time_info';
import { FreeTimeInfoInput } from '../../frameworks/graphQL-service/dto/hobby/hobby.input';
import { Roles } from '../../frameworks/auth/services/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth/services/jwt-auth.guard';
import { RoleGuard } from '../../frameworks/auth/services/role.guard';
import { Deleted } from '../../frameworks/graphQL-service/dto/tour/tour.input';

@Resolver()
export class HobbyGraphResolver {
  constructor(private hobbyUseCases: HobbyUseCases) {
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => FreeTimeInfo)
  async createHobby(@Args('createHobby') hobbyInput: FreeTimeInfoInput): Promise<FreeTimeInfo>{
    return await this.hobbyUseCases.createHobby(hobbyInput)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [FreeTimeInfo])
  async getAllHobbies(): Promise<FreeTimeInfo[]> {
    return await this.hobbyUseCases.getAllHobbies()
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => FreeTimeInfo)
  async changeHobby(@Args('hobby') changedHobby: FreeTimeInfoInput): Promise<FreeTimeInfo> {
    return await this.hobbyUseCases.changeHobbyPrice(changedHobby)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => Deleted)
  async deleteOneHobby(@Args('hobbyName')name: string): Promise<Deleted> {
    return await this.hobbyUseCases.deleteOneHobby(name)
  }
}
