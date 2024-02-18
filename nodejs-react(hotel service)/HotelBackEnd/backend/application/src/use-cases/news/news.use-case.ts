import { BadRequestException, Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/contracts/data-service.contract';
import { NewsInput } from '../../frameworks/graphQL-service/dto/news/news.dto';
import { News } from '../../frameworks/data-services/mongo/models/news.model';
import { getDays } from '../room/room.use-case';

@Injectable()
export class NewsUseCases {
  constructor(
    private readonly dataService: IDataServices
  ) {}

  async createNews(news: NewsInput): Promise<News> {
    try {
      return await this.dataService.news.create(news);
    } catch (error) {
      throw error;
    }
  }

  async getNewsByFilter(filter: object): Promise<News[]> {
    try {
      return await this.dataService.news.findByParameters(filter);
    } catch (error) {
      throw error;
    }
  }


  async getLastDaysNews(): Promise<News[]> {
    const LAST_DAYS = 5
    try {
      const newsList = await this.dataService.news.getAll();
      const filteredList = newsList.filter((news) =>
        (getDays(news.newsDate.toString(), new Date().toString()) <= LAST_DAYS))
      return filteredList
    } catch (error) {
      throw error;
    }
  }
}
