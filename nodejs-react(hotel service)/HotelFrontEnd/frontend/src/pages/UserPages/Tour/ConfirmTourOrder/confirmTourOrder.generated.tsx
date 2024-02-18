import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrderTourMutationVariables = Types.Exact<{
  order: Types.OrderTourInput;
  token: Types.Scalars['String'];
}>;


export type OrderTourMutation = { __typename?: 'Mutation', createOrderTour: { __typename?: 'OrderTour', _id: string } };


export const OrderTourDocument = gql`
    mutation orderTour($order: OrderTourInput!, $token: String!) {
  createOrderTour(createOrderTour: $order, token: $token) {
    _id
  }
}
    `;
export type OrderTourMutationFn = Apollo.MutationFunction<OrderTourMutation, OrderTourMutationVariables>;

/**
 * __useOrderTourMutation__
 *
 * To run a mutation, you first call `useOrderTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderTourMutation, { data, loading, error }] = useOrderTourMutation({
 *   variables: {
 *      order: // value for 'order'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useOrderTourMutation(baseOptions?: Apollo.MutationHookOptions<OrderTourMutation, OrderTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderTourMutation, OrderTourMutationVariables>(OrderTourDocument, options);
      }
export type OrderTourMutationHookResult = ReturnType<typeof useOrderTourMutation>;
export type OrderTourMutationResult = Apollo.MutationResult<OrderTourMutation>;
export type OrderTourMutationOptions = Apollo.BaseMutationOptions<OrderTourMutation, OrderTourMutationVariables>;