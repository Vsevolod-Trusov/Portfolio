import * as Types from '../../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RoomQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RoomQuery = { __typename?: 'Query', getAllRooms: Array<{ __typename?: 'Room', roomNumber: string, roomType: { __typename?: 'RoomType', type: string, basePrice: number, amountBed: number } }> };

export type RoomOrderQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RoomOrderQuery = { __typename?: 'Query', getAllOrderRooms: Array<{ __typename?: 'OrderRoom', _id: string, roomNumber: string, roomType: string, peopleAmount: number, checkInDate: any, exitDate: any, roomServices: Array<string>, orderPrice: number, userLogin: string }> };

export type DeleteOneOrderRoomMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteOneOrderRoomMutation = { __typename?: 'Mutation', deleteOneOrderRoom: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type UpdateRoomMutationVariables = Types.Exact<{
  room: Types.RoomInput;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateOneRoom: { __typename?: 'Room', roomNumber: string, roomType: { __typename?: 'RoomType', amountBed: number, basePrice: number, type: string } } };

export type DeleteRoomMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteOneRoom: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type CreateRoomMutationVariables = Types.Exact<{
  room: Types.RoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', roomNumber: string } };


export const RoomDocument = gql`
    query room {
  getAllRooms {
    roomNumber
    roomType {
      type
      basePrice
      amountBed
    }
  }
}
    `;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomQuery(baseOptions?: Apollo.QueryHookOptions<RoomQuery, RoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomQuery, RoomQueryVariables>(RoomDocument, options);
      }
export function useRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomQuery, RoomQueryVariables>(RoomDocument, options);
        }
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomQueryResult = Apollo.QueryResult<RoomQuery, RoomQueryVariables>;
export const RoomOrderDocument = gql`
    query roomOrder {
  getAllOrderRooms {
    _id
    roomNumber
    roomType
    peopleAmount
    checkInDate
    exitDate
    roomServices
    orderPrice
    userLogin
  }
}
    `;

/**
 * __useRoomOrderQuery__
 *
 * To run a query within a React component, call `useRoomOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomOrderQuery(baseOptions?: Apollo.QueryHookOptions<RoomOrderQuery, RoomOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomOrderQuery, RoomOrderQueryVariables>(RoomOrderDocument, options);
      }
export function useRoomOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomOrderQuery, RoomOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomOrderQuery, RoomOrderQueryVariables>(RoomOrderDocument, options);
        }
export type RoomOrderQueryHookResult = ReturnType<typeof useRoomOrderQuery>;
export type RoomOrderLazyQueryHookResult = ReturnType<typeof useRoomOrderLazyQuery>;
export type RoomOrderQueryResult = Apollo.QueryResult<RoomOrderQuery, RoomOrderQueryVariables>;
export const DeleteOneOrderRoomDocument = gql`
    mutation deleteOneOrderRoom($id: String!) {
  deleteOneOrderRoom(orderId: $id) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteOneOrderRoomMutationFn = Apollo.MutationFunction<DeleteOneOrderRoomMutation, DeleteOneOrderRoomMutationVariables>;

/**
 * __useDeleteOneOrderRoomMutation__
 *
 * To run a mutation, you first call `useDeleteOneOrderRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneOrderRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneOrderRoomMutation, { data, loading, error }] = useDeleteOneOrderRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOneOrderRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneOrderRoomMutation, DeleteOneOrderRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneOrderRoomMutation, DeleteOneOrderRoomMutationVariables>(DeleteOneOrderRoomDocument, options);
      }
export type DeleteOneOrderRoomMutationHookResult = ReturnType<typeof useDeleteOneOrderRoomMutation>;
export type DeleteOneOrderRoomMutationResult = Apollo.MutationResult<DeleteOneOrderRoomMutation>;
export type DeleteOneOrderRoomMutationOptions = Apollo.BaseMutationOptions<DeleteOneOrderRoomMutation, DeleteOneOrderRoomMutationVariables>;
export const UpdateRoomDocument = gql`
    mutation updateRoom($room: RoomInput!) {
  updateOneRoom(room: $room) {
    roomNumber
    roomType {
      amountBed
      basePrice
      type
    }
  }
}
    `;
export type UpdateRoomMutationFn = Apollo.MutationFunction<UpdateRoomMutation, UpdateRoomMutationVariables>;

/**
 * __useUpdateRoomMutation__
 *
 * To run a mutation, you first call `useUpdateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoomMutation, { data, loading, error }] = useUpdateRoomMutation({
 *   variables: {
 *      room: // value for 'room'
 *   },
 * });
 */
export function useUpdateRoomMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoomMutation, UpdateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoomMutation, UpdateRoomMutationVariables>(UpdateRoomDocument, options);
      }
export type UpdateRoomMutationHookResult = ReturnType<typeof useUpdateRoomMutation>;
export type UpdateRoomMutationResult = Apollo.MutationResult<UpdateRoomMutation>;
export type UpdateRoomMutationOptions = Apollo.BaseMutationOptions<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation deleteRoom($name: String!) {
  deleteOneRoom(name: $name) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const CreateRoomDocument = gql`
    mutation createRoom($room: RoomInput!) {
  createRoom(createRoom: $room) {
    roomNumber
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      room: // value for 'room'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;