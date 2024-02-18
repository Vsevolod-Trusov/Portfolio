import { Module } from '@nestjs/common';
import { DataServiceModule } from './frameworks/data-services/data-services.module';
  import { ResolversModule } from './resolvers/resolvers.module';
import { ConfigModule as ApplicationConfigModule } from './frameworks/config/config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ApplicationConfigModule,
    DataServiceModule,
    ResolversModule
  ]
})
// @ts-ignore
export class AppModule {
}
