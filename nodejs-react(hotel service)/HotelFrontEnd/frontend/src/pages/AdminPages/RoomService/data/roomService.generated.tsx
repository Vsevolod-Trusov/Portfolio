import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetServicesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetServicesQuery = { __typename?: 'Query', getAllRoomServices: Array<{ __typename?: 'RoomService', serviceName: string, servicePrice: number, serviceDescription: string }> };

export type UpdateServiceMutationVariables = Types.Exact<{
  service: Types.RoomServiceInput;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateRoomService: { __typename?: 'RoomService', serviceName: string } };

export type DeleteServiceMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteOneRoomService: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type CreateRoomServiceMutationVariables = Types.Exact<{
  createRoomService: Types.RoomServiceInput;
}>;


export type CreateRoomServiceMutation = { __typename?: 'Mutation', createRoomService: { __typename?: 'RoomService', serviceName: string, servicePrice: number, serviceDescription: string } };


export const GetServicesDocument = gql`
    query getServices {
  getAllRoomServices {
    serviceName
    servicePrice
    serviceDescription
  }
}
    `;

/**
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
      }
export function useGetServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesQueryResult = Apollo.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const UpdateServiceDocument = gql`
    mutation updateService($service: RoomServiceInput!) {
  updateRoomService(service: $service) {
    serviceName
  }
}
    `;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      service: // value for 'service'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation deleteService($name: String!) {
  deleteOneRoomService(serviceName: $name) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const CreateRoomServiceDocument = gql`
    mutation createRoomService($createRoomService: RoomServiceInput!) {
  createRoomService(createRoomService: $createRoomService) {
    serviceName
    servicePrice
    serviceDescription
  }
}
    `;
export type CreateRoomServiceMutationFn = Apollo.MutationFunction<CreateRoomServiceMutation, CreateRoomServiceMutationVariables>;

/**
 * __useCreateRoomServiceMutation__
 *
 * To run a mutation, you first call `useCreateRoomServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomServiceMutation, { data, loading, error }] = useCreateRoomServiceMutation({
 *   variables: {
 *      createRoomService: // value for 'createRoomService'
 *   },
 * });
 */
export function useCreateRoomServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomServiceMutation, CreateRoomServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomServiceMutation, CreateRoomServiceMutationVariables>(CreateRoomServiceDocument, options);
      }
export type CreateRoomServiceMutationHookResult = ReturnType<typeof useCreateRoomServiceMutation>;
export type CreateRoomServiceMutationResult = Apollo.MutationResult<CreateRoomServiceMutation>;
export type CreateRoomServiceMutationOptions = Apollo.BaseMutationOptions<CreateRoomServiceMutation, CreateRoomServiceMutationVariables>;