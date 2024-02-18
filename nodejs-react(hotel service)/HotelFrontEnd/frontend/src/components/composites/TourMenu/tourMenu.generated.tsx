import * as Types from '../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllToursQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllToursQuery = { __typename?: 'Query', getAllTours: Array<{ __typename?: 'Tour', tourName: string, tourPrice: number, description: string, startDate: any, endDate: any }> };


export const GetAllToursDocument = gql`
    query getAllTours {
  getAllTours {
    tourName
    tourPrice
    description
    startDate
    endDate
  }
}
    `;

/**
 * __useGetAllToursQuery__
 *
 * To run a query within a React component, call `useGetAllToursQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllToursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllToursQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllToursQuery(baseOptions?: Apollo.QueryHookOptions<GetAllToursQuery, GetAllToursQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllToursQuery, GetAllToursQueryVariables>(GetAllToursDocument, options);
      }
export function useGetAllToursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllToursQuery, GetAllToursQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllToursQuery, GetAllToursQueryVariables>(GetAllToursDocument, options);
        }
export type GetAllToursQueryHookResult = ReturnType<typeof useGetAllToursQuery>;
export type GetAllToursLazyQueryHookResult = ReturnType<typeof useGetAllToursLazyQuery>;
export type GetAllToursQueryResult = Apollo.QueryResult<GetAllToursQuery, GetAllToursQueryVariables>;