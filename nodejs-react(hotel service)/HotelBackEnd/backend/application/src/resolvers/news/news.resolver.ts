import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { News } from '../../frameworks/data-services/mongo/models/news.model';
import { NewsInput } from '../../frameworks/graphQL-service/dto/news/news.dto';
import { NewsUseCases } from '../../use-cases/news/news.use-case';
import { PubSub } from 'graphql-subscriptions';
import { Roles } from '../../frameworks/auth/services/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../frameworks/auth/services/jwt-auth.guard';
import { RoleGuard } from '../../frameworks/auth/services/role.guard';

@Resolver()
export class NewsGraphResolver {
  constructor(private readonly newsUseCases: NewsUseCases,
              private readonly pubSub: PubSub) {
  }
  @Subscription(() => [News], {
    name: 'createNews'
  })
  async newsAdded() {
    return this.pubSub.asyncIterator('newsAdded');
  }
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => [News])
  async createNews(@Args('news') newsInput: NewsInput): Promise<News[]>{
      await this.newsUseCases.createNews(newsInput)
      const newsList = await this.newsUseCases.getLastDaysNews()
      this.pubSub.publish('newsAdded', { createNews: newsList });
      return newsList
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [News])
  async getLastNews(): Promise<News[]> {
    return await this.newsUseCases.getLastDaysNews()
  }

  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [News])
  async findNewsByFilter(@Args('filter') filter: NewsInput): Promise<News[]> {
    return await this.newsUseCases.getNewsByFilter(filter)
  }
}
