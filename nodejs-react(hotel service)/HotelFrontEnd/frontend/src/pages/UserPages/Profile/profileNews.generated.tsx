import * as Types from '../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PubSubSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type PubSubSubscription = { __typename?: 'Subscription', createNews: Array<{ __typename?: 'News', _id: string, newsHeader: string, newsContent: string, newsDate: any, newsImage: { __typename?: 'Image', imagePath: string } }> };

export type GetLastNewsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetLastNewsQuery = { __typename?: 'Query', getLastNews: Array<{ __typename?: 'News', _id: string, newsHeader: string, newsContent: string, newsDate: any, newsImage: { __typename?: 'Image', imagePath: string } }> };


export const PubSubDocument = gql`
    subscription pubSub {
  createNews {
    _id
    newsHeader
    newsContent
    newsDate
    newsImage {
      imagePath
    }
  }
}
    `;

/**
 * __usePubSubSubscription__
 *
 * To run a query within a React component, call `usePubSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePubSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePubSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePubSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PubSubSubscription, PubSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PubSubSubscription, PubSubSubscriptionVariables>(PubSubDocument, options);
      }
export type PubSubSubscriptionHookResult = ReturnType<typeof usePubSubSubscription>;
export type PubSubSubscriptionResult = Apollo.SubscriptionResult<PubSubSubscription>;
export const GetLastNewsDocument = gql`
    query getLastNews {
  getLastNews {
    _id
    newsHeader
    newsContent
    newsDate
    newsImage {
      imagePath
    }
  }
}
    `;

/**
 * __useGetLastNewsQuery__
 *
 * To run a query within a React component, call `useGetLastNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLastNewsQuery(baseOptions?: Apollo.QueryHookOptions<GetLastNewsQuery, GetLastNewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastNewsQuery, GetLastNewsQueryVariables>(GetLastNewsDocument, options);
      }
export function useGetLastNewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastNewsQuery, GetLastNewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastNewsQuery, GetLastNewsQueryVariables>(GetLastNewsDocument, options);
        }
export type GetLastNewsQueryHookResult = ReturnType<typeof useGetLastNewsQuery>;
export type GetLastNewsLazyQueryHookResult = ReturnType<typeof useGetLastNewsLazyQuery>;
export type GetLastNewsQueryResult = Apollo.QueryResult<GetLastNewsQuery, GetLastNewsQueryVariables>;