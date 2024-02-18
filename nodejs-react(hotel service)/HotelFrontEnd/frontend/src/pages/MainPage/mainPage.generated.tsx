import * as Types from '../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRoomsToBookQueryVariables = Types.Exact<{
  startDate: Types.Scalars['String'];
  finishDate: Types.Scalars['String'];
  adultsAmount: Types.Scalars['String'];
}>;


export type GetRoomsToBookQuery = { __typename?: 'Query', getRoomTypesToBook: Array<{ __typename?: 'RoomType', type: string, basePrice: number }> };


export const GetRoomsToBookDocument = gql`
    query getRoomsToBook($startDate: String!, $finishDate: String!, $adultsAmount: String!) {
  getRoomTypesToBook(
    startDate: $startDate
    finishDate: $finishDate
    adultsAmount: $adultsAmount
  ) {
    type
    basePrice
  }
}
    `;

/**
 * __useGetRoomsToBookQuery__
 *
 * To run a query within a React component, call `useGetRoomsToBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsToBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsToBookQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      finishDate: // value for 'finishDate'
 *      adultsAmount: // value for 'adultsAmount'
 *   },
 * });
 */
export function useGetRoomsToBookQuery(baseOptions: Apollo.QueryHookOptions<GetRoomsToBookQuery, GetRoomsToBookQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomsToBookQuery, GetRoomsToBookQueryVariables>(GetRoomsToBookDocument, options);
      }
export function useGetRoomsToBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomsToBookQuery, GetRoomsToBookQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomsToBookQuery, GetRoomsToBookQueryVariables>(GetRoomsToBookDocument, options);
        }
export type GetRoomsToBookQueryHookResult = ReturnType<typeof useGetRoomsToBookQuery>;
export type GetRoomsToBookLazyQueryHookResult = ReturnType<typeof useGetRoomsToBookLazyQuery>;
export type GetRoomsToBookQueryResult = Apollo.QueryResult<GetRoomsToBookQuery, GetRoomsToBookQueryVariables>;