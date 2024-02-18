import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MealsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MealsQuery = { __typename?: 'Query', getAllMeals: Array<{ __typename?: 'Meal', mealName: string, mealPrice: number, mealDescription: string }> };

export type MealOrdersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MealOrdersQuery = { __typename?: 'Query', getAllMealOrders: Array<{ __typename?: 'OrderMeal', _id: string, mealsAmount: Array<number>, meals: Array<string>, orderPrice: number, inRoom: boolean, tableNumber?: string | null, bookDate?: string | null, bookTime?: string | null, userLogin: string }> };

export type DeleteMealOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteMealOrderMutation = { __typename?: 'Mutation', deleteOneMealOrder: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type DeleteMealMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type DeleteMealMutation = { __typename?: 'Mutation', deleteOneMeal: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type UpdateMealMutationVariables = Types.Exact<{
  meal: Types.MealInput;
}>;


export type UpdateMealMutation = { __typename?: 'Mutation', updateMeal: { __typename?: 'Meal', mealName: string, mealPrice: number, mealDescription: string } };

export type CreateMealMutationVariables = Types.Exact<{
  meal: Types.MealInput;
}>;


export type CreateMealMutation = { __typename?: 'Mutation', createMeal: { __typename?: 'Meal', mealName: string, mealDescription: string, mealPrice: number } };


export const MealsDocument = gql`
    query meals {
  getAllMeals {
    mealName
    mealPrice
    mealDescription
  }
}
    `;

/**
 * __useMealsQuery__
 *
 * To run a query within a React component, call `useMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMealsQuery(baseOptions?: Apollo.QueryHookOptions<MealsQuery, MealsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MealsQuery, MealsQueryVariables>(MealsDocument, options);
      }
export function useMealsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealsQuery, MealsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MealsQuery, MealsQueryVariables>(MealsDocument, options);
        }
export type MealsQueryHookResult = ReturnType<typeof useMealsQuery>;
export type MealsLazyQueryHookResult = ReturnType<typeof useMealsLazyQuery>;
export type MealsQueryResult = Apollo.QueryResult<MealsQuery, MealsQueryVariables>;
export const MealOrdersDocument = gql`
    query mealOrders {
  getAllMealOrders {
    _id
    mealsAmount
    meals
    orderPrice
    inRoom
    tableNumber
    bookDate
    bookTime
    userLogin
  }
}
    `;

/**
 * __useMealOrdersQuery__
 *
 * To run a query within a React component, call `useMealOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMealOrdersQuery(baseOptions?: Apollo.QueryHookOptions<MealOrdersQuery, MealOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MealOrdersQuery, MealOrdersQueryVariables>(MealOrdersDocument, options);
      }
export function useMealOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealOrdersQuery, MealOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MealOrdersQuery, MealOrdersQueryVariables>(MealOrdersDocument, options);
        }
export type MealOrdersQueryHookResult = ReturnType<typeof useMealOrdersQuery>;
export type MealOrdersLazyQueryHookResult = ReturnType<typeof useMealOrdersLazyQuery>;
export type MealOrdersQueryResult = Apollo.QueryResult<MealOrdersQuery, MealOrdersQueryVariables>;
export const DeleteMealOrderDocument = gql`
    mutation deleteMealOrder($id: String!) {
  deleteOneMealOrder(orderId: $id) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteMealOrderMutationFn = Apollo.MutationFunction<DeleteMealOrderMutation, DeleteMealOrderMutationVariables>;

/**
 * __useDeleteMealOrderMutation__
 *
 * To run a mutation, you first call `useDeleteMealOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMealOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMealOrderMutation, { data, loading, error }] = useDeleteMealOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMealOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMealOrderMutation, DeleteMealOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMealOrderMutation, DeleteMealOrderMutationVariables>(DeleteMealOrderDocument, options);
      }
export type DeleteMealOrderMutationHookResult = ReturnType<typeof useDeleteMealOrderMutation>;
export type DeleteMealOrderMutationResult = Apollo.MutationResult<DeleteMealOrderMutation>;
export type DeleteMealOrderMutationOptions = Apollo.BaseMutationOptions<DeleteMealOrderMutation, DeleteMealOrderMutationVariables>;
export const DeleteMealDocument = gql`
    mutation deleteMeal($name: String!) {
  deleteOneMeal(mealName: $name) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteMealMutationFn = Apollo.MutationFunction<DeleteMealMutation, DeleteMealMutationVariables>;

/**
 * __useDeleteMealMutation__
 *
 * To run a mutation, you first call `useDeleteMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMealMutation, { data, loading, error }] = useDeleteMealMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteMealMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMealMutation, DeleteMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMealMutation, DeleteMealMutationVariables>(DeleteMealDocument, options);
      }
export type DeleteMealMutationHookResult = ReturnType<typeof useDeleteMealMutation>;
export type DeleteMealMutationResult = Apollo.MutationResult<DeleteMealMutation>;
export type DeleteMealMutationOptions = Apollo.BaseMutationOptions<DeleteMealMutation, DeleteMealMutationVariables>;
export const UpdateMealDocument = gql`
    mutation updateMeal($meal: MealInput!) {
  updateMeal(meal: $meal) {
    mealName
    mealPrice
    mealDescription
  }
}
    `;
export type UpdateMealMutationFn = Apollo.MutationFunction<UpdateMealMutation, UpdateMealMutationVariables>;

/**
 * __useUpdateMealMutation__
 *
 * To run a mutation, you first call `useUpdateMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMealMutation, { data, loading, error }] = useUpdateMealMutation({
 *   variables: {
 *      meal: // value for 'meal'
 *   },
 * });
 */
export function useUpdateMealMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMealMutation, UpdateMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMealMutation, UpdateMealMutationVariables>(UpdateMealDocument, options);
      }
export type UpdateMealMutationHookResult = ReturnType<typeof useUpdateMealMutation>;
export type UpdateMealMutationResult = Apollo.MutationResult<UpdateMealMutation>;
export type UpdateMealMutationOptions = Apollo.BaseMutationOptions<UpdateMealMutation, UpdateMealMutationVariables>;
export const CreateMealDocument = gql`
    mutation createMeal($meal: MealInput!) {
  createMeal(createMeal: $meal) {
    mealName
    mealDescription
    mealPrice
  }
}
    `;
export type CreateMealMutationFn = Apollo.MutationFunction<CreateMealMutation, CreateMealMutationVariables>;

/**
 * __useCreateMealMutation__
 *
 * To run a mutation, you first call `useCreateMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMealMutation, { data, loading, error }] = useCreateMealMutation({
 *   variables: {
 *      meal: // value for 'meal'
 *   },
 * });
 */
export function useCreateMealMutation(baseOptions?: Apollo.MutationHookOptions<CreateMealMutation, CreateMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMealMutation, CreateMealMutationVariables>(CreateMealDocument, options);
      }
export type CreateMealMutationHookResult = ReturnType<typeof useCreateMealMutation>;
export type CreateMealMutationResult = Apollo.MutationResult<CreateMealMutation>;
export type CreateMealMutationOptions = Apollo.BaseMutationOptions<CreateMealMutation, CreateMealMutationVariables>;