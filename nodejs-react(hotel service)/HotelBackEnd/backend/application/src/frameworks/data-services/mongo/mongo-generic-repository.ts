import { IGenericRepository } from '../../../core/contracts/generic-repository.contract';
import { Model } from 'mongoose';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async getAll(): Promise<T[]> {
    return await this._repository.find().populate(this._populateOnFind).exec();
  }

  async findOneByParameters(object: object): Promise<T> {
    return await this._repository.findOne(object).exec();
  }

  async findByParameters(object: object): Promise<T[]> {
    return await this._repository.find(object).populate(this._populateOnFind).exec();
  }

  async create(item: T): Promise<T> {
    return await this._repository.create(item);
  }

  async update(filter: object, item: T) {
    return await this._repository.findOneAndUpdate(filter, item);
  }

  async deleteOne(filter: object) {
    return await this._repository.deleteOne(filter);
  }
}
