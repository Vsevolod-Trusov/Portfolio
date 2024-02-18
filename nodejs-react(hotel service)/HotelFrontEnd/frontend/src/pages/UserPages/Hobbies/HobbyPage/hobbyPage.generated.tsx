import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetHobbyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetHobbyQuery = { __typename?: 'Query', getAllHobbies: Array<{ __typename?: 'FreeTimeInfo', leisureName: string, price?: number | null, description: string }> };


export const GetHobbyDocument = gql`
    query getHobby {
  getAllHobbies {
    leisureName
    price
    description
  }
}
    `;

/**
 * __useGetHobbyQuery__
 *
 * To run a query within a React component, call `useGetHobbyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHobbyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHobbyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHobbyQuery(baseOptions?: Apollo.QueryHookOptions<GetHobbyQuery, GetHobbyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHobbyQuery, GetHobbyQueryVariables>(GetHobbyDocument, options);
      }
export function useGetHobbyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHobbyQuery, GetHobbyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHobbyQuery, GetHobbyQueryVariables>(GetHobbyDocument, options);
        }
export type GetHobbyQueryHookResult = ReturnType<typeof useGetHobbyQuery>;
export type GetHobbyLazyQueryHookResult = ReturnType<typeof useGetHobbyLazyQuery>;
export type GetHobbyQueryResult = Apollo.QueryResult<GetHobbyQuery, GetHobbyQueryVariables>;