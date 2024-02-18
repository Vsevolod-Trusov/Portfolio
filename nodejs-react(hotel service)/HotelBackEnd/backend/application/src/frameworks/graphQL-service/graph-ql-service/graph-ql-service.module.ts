import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      installSubscriptionHandlers: true,
    })
  ],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    }
    ],

  exports:[PubSub]

})
export class GraphQlServiceModule {}
