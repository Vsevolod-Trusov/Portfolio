import * as Types from '../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMealsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMealsQuery = { __typename?: 'Query', getAllMeals: Array<{ __typename?: 'Meal', mealName: string, mealPrice: number, mealDescription: string }> };


export const GetMealsDocument = gql`
    query getMeals {
  getAllMeals {
    mealName
    mealPrice
    mealDescription
  }
}
    `;

/**
 * __useGetMealsQuery__
 *
 * To run a query within a React component, call `useGetMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMealsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMealsQuery(baseOptions?: Apollo.QueryHookOptions<GetMealsQuery, GetMealsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMealsQuery, GetMealsQueryVariables>(GetMealsDocument, options);
      }
export function useGetMealsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMealsQuery, GetMealsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMealsQuery, GetMealsQueryVariables>(GetMealsDocument, options);
        }
export type GetMealsQueryHookResult = ReturnType<typeof useGetMealsQuery>;
export type GetMealsLazyQueryHookResult = ReturnType<typeof useGetMealsLazyQuery>;
export type GetMealsQueryResult = Apollo.QueryResult<GetMealsQuery, GetMealsQueryVariables>;