import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrderMealMutationVariables = Types.Exact<{
  order: Types.OrderMealInput;
  token: Types.Scalars['String'];
}>;


export type OrderMealMutation = { __typename?: 'Mutation', createOrderMeal: { __typename?: 'OrderMeal', _id: string } };


export const OrderMealDocument = gql`
    mutation orderMeal($order: OrderMealInput!, $token: String!) {
  createOrderMeal(createOrder: $order, token: $token) {
    _id
  }
}
    `;
export type OrderMealMutationFn = Apollo.MutationFunction<OrderMealMutation, OrderMealMutationVariables>;

/**
 * __useOrderMealMutation__
 *
 * To run a mutation, you first call `useOrderMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderMealMutation, { data, loading, error }] = useOrderMealMutation({
 *   variables: {
 *      order: // value for 'order'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useOrderMealMutation(baseOptions?: Apollo.MutationHookOptions<OrderMealMutation, OrderMealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderMealMutation, OrderMealMutationVariables>(OrderMealDocument, options);
      }
export type OrderMealMutationHookResult = ReturnType<typeof useOrderMealMutation>;
export type OrderMealMutationResult = Apollo.MutationResult<OrderMealMutation>;
export type OrderMealMutationOptions = Apollo.BaseMutationOptions<OrderMealMutation, OrderMealMutationVariables>;