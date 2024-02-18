import { Global, Module } from '@nestjs/common';
import { MongoDataServiceModule } from './mongo/mongo-data-service.module';
@Global()
@Module({
  imports: [MongoDataServiceModule],
  exports: [MongoDataServiceModule],
})
export class DataServiceModule {}
