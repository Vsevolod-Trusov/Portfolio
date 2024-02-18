import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrderRoomMutationVariables = Types.Exact<{
  createOrderRoom: Types.OrderRoomInput;
  token: Types.Scalars['String'];
}>;


export type CreateOrderRoomMutation = { __typename?: 'Mutation', createOrderRoom: { __typename?: 'OrderRoom', _id: string, roomNumber: string, peopleAmount: number, checkInDate: any, exitDate: any, roomServices: Array<string>, roomType: string, orderPrice: number, userLogin: string } };


export const CreateOrderRoomDocument = gql`
    mutation createOrderRoom($createOrderRoom: OrderRoomInput!, $token: String!) {
  createOrderRoom(createOrderRoom: $createOrderRoom, token: $token) {
    _id
    roomNumber
    peopleAmount
    checkInDate
    exitDate
    roomServices
    roomType
    orderPrice
    userLogin
  }
}
    `;
export type CreateOrderRoomMutationFn = Apollo.MutationFunction<CreateOrderRoomMutation, CreateOrderRoomMutationVariables>;

/**
 * __useCreateOrderRoomMutation__
 *
 * To run a mutation, you first call `useCreateOrderRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderRoomMutation, { data, loading, error }] = useCreateOrderRoomMutation({
 *   variables: {
 *      createOrderRoom: // value for 'createOrderRoom'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCreateOrderRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderRoomMutation, CreateOrderRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderRoomMutation, CreateOrderRoomMutationVariables>(CreateOrderRoomDocument, options);
      }
export type CreateOrderRoomMutationHookResult = ReturnType<typeof useCreateOrderRoomMutation>;
export type CreateOrderRoomMutationResult = Apollo.MutationResult<CreateOrderRoomMutation>;
export type CreateOrderRoomMutationOptions = Apollo.BaseMutationOptions<CreateOrderRoomMutation, CreateOrderRoomMutationVariables>;