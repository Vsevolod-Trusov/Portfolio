import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserUseCases } from '../../use-cases/user/user.use-case';
import { User } from '../../frameworks/data-services/mongo/models/user.model';
import { AccessTokenOutput, UserInput, UserOutput } from '../../frameworks/graphQL-service/dto/user/user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth/services/jwt-auth.guard';
import { JwtRefreshGuard } from '../../frameworks/auth/services/jwt-refresh.guard';
import { Roles } from '../../frameworks/auth/services/roles.decorator';
import { RoleGuard } from '../../frameworks/auth/services/role.guard';
import { Request } from 'express';

@Resolver()
export class UserGraphResolver {
  constructor(private readonly userUseCases: UserUseCases) {
  }

  @Mutation(() => User)
  async createUser(@Args('createUser') createUserInput: UserInput): Promise<User>{
      return await this.userUseCases.createUser(createUserInput)
  }

  @Mutation(() => UserOutput)
  loginUser(@Args('userInput') loginUserInput: UserInput) {
    return this.userUseCases.loginUser(loginUserInput);
  }

  @Roles('admin', 'user')
  @UseGuards(JwtRefreshGuard, RoleGuard)
  @Query(() => UserOutput)
  refreshToken(@Args('userInput') userInput: UserInput) {
    return this.userUseCases.loginUser(userInput);
  }


  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => User)
  async getOneUser(@Args('login') login: string): Promise<User> {
    return await this.userUseCases.getUserByFilter({login: login})
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => AccessTokenOutput)
  async getRole(@Args('token') token: string): Promise<AccessTokenOutput> {
    //, @Context() context
    //console.log(context);
    return await this.userUseCases.getRoleByAccessToken(token)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => Boolean)
  async getIsSubscribed(@Args('token') token: string): Promise<boolean> {
    return await this.userUseCases.getUserIsSubscribed(token)
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => User)
  async subscribeOnNews(@Args('token') token: string): Promise<User> {
    return await this.userUseCases.subscribeUserOnNews(token)
  }


  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => User)
  async unsubscribeOnNews(@Args('token') token: string): Promise<User> {
    return await this.userUseCases.unsubscribeUserOnNews(token)
  }
}
