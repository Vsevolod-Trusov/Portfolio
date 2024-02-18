import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IsSubscribedQueryVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type IsSubscribedQuery = { __typename?: 'Query', getIsSubscribed: boolean };

export type SubscribeMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type SubscribeMutation = { __typename?: 'Mutation', subscribeOnNews: { __typename?: 'User', subscribedOnNews?: boolean | null } };

export type UnsubscribeMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type UnsubscribeMutation = { __typename?: 'Mutation', unsubscribeOnNews: { __typename?: 'User', subscribedOnNews?: boolean | null } };


export const IsSubscribedDocument = gql`
    query isSubscribed($token: String!) {
  getIsSubscribed(token: $token)
}
    `;

/**
 * __useIsSubscribedQuery__
 *
 * To run a query within a React component, call `useIsSubscribedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsSubscribedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsSubscribedQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useIsSubscribedQuery(baseOptions: Apollo.QueryHookOptions<IsSubscribedQuery, IsSubscribedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsSubscribedQuery, IsSubscribedQueryVariables>(IsSubscribedDocument, options);
      }
export function useIsSubscribedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsSubscribedQuery, IsSubscribedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsSubscribedQuery, IsSubscribedQueryVariables>(IsSubscribedDocument, options);
        }
export type IsSubscribedQueryHookResult = ReturnType<typeof useIsSubscribedQuery>;
export type IsSubscribedLazyQueryHookResult = ReturnType<typeof useIsSubscribedLazyQuery>;
export type IsSubscribedQueryResult = Apollo.QueryResult<IsSubscribedQuery, IsSubscribedQueryVariables>;
export const SubscribeDocument = gql`
    mutation subscribe($token: String!) {
  subscribeOnNews(token: $token) {
    subscribedOnNews
  }
}
    `;
export type SubscribeMutationFn = Apollo.MutationFunction<SubscribeMutation, SubscribeMutationVariables>;

/**
 * __useSubscribeMutation__
 *
 * To run a mutation, you first call `useSubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeMutation, { data, loading, error }] = useSubscribeMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSubscribeMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeMutation, SubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument, options);
      }
export type SubscribeMutationHookResult = ReturnType<typeof useSubscribeMutation>;
export type SubscribeMutationResult = Apollo.MutationResult<SubscribeMutation>;
export type SubscribeMutationOptions = Apollo.BaseMutationOptions<SubscribeMutation, SubscribeMutationVariables>;
export const UnsubscribeDocument = gql`
    mutation unsubscribe($token: String!) {
  unsubscribeOnNews(token: $token) {
    subscribedOnNews
  }
}
    `;
export type UnsubscribeMutationFn = Apollo.MutationFunction<UnsubscribeMutation, UnsubscribeMutationVariables>;

/**
 * __useUnsubscribeMutation__
 *
 * To run a mutation, you first call `useUnsubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeMutation, { data, loading, error }] = useUnsubscribeMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUnsubscribeMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeMutation, UnsubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeMutation, UnsubscribeMutationVariables>(UnsubscribeDocument, options);
      }
export type UnsubscribeMutationHookResult = ReturnType<typeof useUnsubscribeMutation>;
export type UnsubscribeMutationResult = Apollo.MutationResult<UnsubscribeMutation>;
export type UnsubscribeMutationOptions = Apollo.BaseMutationOptions<UnsubscribeMutation, UnsubscribeMutationVariables>;