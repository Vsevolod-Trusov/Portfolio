export abstract class IGenericRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract findOneByParameters(object: object): Promise<T>

  abstract findByParameters(object: object): Promise<T[]>

  abstract create(item: T): Promise<T>;

  abstract update(filter: object, item: T);

  abstract deleteOne(filter: object);

}
