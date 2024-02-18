import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllTablesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllTablesQuery = { __typename?: 'Query', getAllTables: Array<{ __typename?: 'PlaceTable', tableNumber: string, status: string, amountSeats: number }> };

export type GetBookTimesQueryVariables = Types.Exact<{
  tableNumber: Types.Scalars['String'];
  bookDate: Types.Scalars['String'];
}>;


export type GetBookTimesQuery = { __typename?: 'Query', getBookTimes: Array<{ __typename?: 'TableTimeModel', key: string, value: boolean }> };


export const GetAllTablesDocument = gql`
    query getAllTables {
  getAllTables {
    tableNumber
    status
    amountSeats
  }
}
    `;

/**
 * __useGetAllTablesQuery__
 *
 * To run a query within a React component, call `useGetAllTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTablesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTablesQuery, GetAllTablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTablesQuery, GetAllTablesQueryVariables>(GetAllTablesDocument, options);
      }
export function useGetAllTablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTablesQuery, GetAllTablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTablesQuery, GetAllTablesQueryVariables>(GetAllTablesDocument, options);
        }
export type GetAllTablesQueryHookResult = ReturnType<typeof useGetAllTablesQuery>;
export type GetAllTablesLazyQueryHookResult = ReturnType<typeof useGetAllTablesLazyQuery>;
export type GetAllTablesQueryResult = Apollo.QueryResult<GetAllTablesQuery, GetAllTablesQueryVariables>;
export const GetBookTimesDocument = gql`
    query getBookTimes($tableNumber: String!, $bookDate: String!) {
  getBookTimes(tableNumber: $tableNumber, bookDate: $bookDate) {
    key
    value
  }
}
    `;

/**
 * __useGetBookTimesQuery__
 *
 * To run a query within a React component, call `useGetBookTimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookTimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookTimesQuery({
 *   variables: {
 *      tableNumber: // value for 'tableNumber'
 *      bookDate: // value for 'bookDate'
 *   },
 * });
 */
export function useGetBookTimesQuery(baseOptions: Apollo.QueryHookOptions<GetBookTimesQuery, GetBookTimesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookTimesQuery, GetBookTimesQueryVariables>(GetBookTimesDocument, options);
      }
export function useGetBookTimesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookTimesQuery, GetBookTimesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookTimesQuery, GetBookTimesQueryVariables>(GetBookTimesDocument, options);
        }
export type GetBookTimesQueryHookResult = ReturnType<typeof useGetBookTimesQuery>;
export type GetBookTimesLazyQueryHookResult = ReturnType<typeof useGetBookTimesLazyQuery>;
export type GetBookTimesQueryResult = Apollo.QueryResult<GetBookTimesQuery, GetBookTimesQueryVariables>;