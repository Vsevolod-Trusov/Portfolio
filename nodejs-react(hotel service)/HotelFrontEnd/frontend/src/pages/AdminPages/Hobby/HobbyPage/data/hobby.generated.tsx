import * as Types from '../../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type HobbiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HobbiesQuery = { __typename?: 'Query', getAllHobbies: Array<{ __typename?: 'FreeTimeInfo', leisureName: string, description: string, price?: number | null }> };

export type ChangeHobbyMutationVariables = Types.Exact<{
  hobby: Types.FreeTimeInfoInput;
}>;


export type ChangeHobbyMutation = { __typename?: 'Mutation', changeHobby: { __typename?: 'FreeTimeInfo', leisureName: string, description: string, price?: number | null } };

export type DeleteOneHobbyMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type DeleteOneHobbyMutation = { __typename?: 'Mutation', deleteOneHobby: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type CreateHobbyMutationVariables = Types.Exact<{
  hobby: Types.FreeTimeInfoInput;
}>;


export type CreateHobbyMutation = { __typename?: 'Mutation', createHobby: { __typename?: 'FreeTimeInfo', leisureName: string } };


export const HobbiesDocument = gql`
    query hobbies {
  getAllHobbies {
    leisureName
    description
    price
  }
}
    `;

/**
 * __useHobbiesQuery__
 *
 * To run a query within a React component, call `useHobbiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHobbiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHobbiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHobbiesQuery(baseOptions?: Apollo.QueryHookOptions<HobbiesQuery, HobbiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HobbiesQuery, HobbiesQueryVariables>(HobbiesDocument, options);
      }
export function useHobbiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HobbiesQuery, HobbiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HobbiesQuery, HobbiesQueryVariables>(HobbiesDocument, options);
        }
export type HobbiesQueryHookResult = ReturnType<typeof useHobbiesQuery>;
export type HobbiesLazyQueryHookResult = ReturnType<typeof useHobbiesLazyQuery>;
export type HobbiesQueryResult = Apollo.QueryResult<HobbiesQuery, HobbiesQueryVariables>;
export const ChangeHobbyDocument = gql`
    mutation changeHobby($hobby: FreeTimeInfoInput!) {
  changeHobby(hobby: $hobby) {
    leisureName
    description
    price
  }
}
    `;
export type ChangeHobbyMutationFn = Apollo.MutationFunction<ChangeHobbyMutation, ChangeHobbyMutationVariables>;

/**
 * __useChangeHobbyMutation__
 *
 * To run a mutation, you first call `useChangeHobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeHobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeHobbyMutation, { data, loading, error }] = useChangeHobbyMutation({
 *   variables: {
 *      hobby: // value for 'hobby'
 *   },
 * });
 */
export function useChangeHobbyMutation(baseOptions?: Apollo.MutationHookOptions<ChangeHobbyMutation, ChangeHobbyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeHobbyMutation, ChangeHobbyMutationVariables>(ChangeHobbyDocument, options);
      }
export type ChangeHobbyMutationHookResult = ReturnType<typeof useChangeHobbyMutation>;
export type ChangeHobbyMutationResult = Apollo.MutationResult<ChangeHobbyMutation>;
export type ChangeHobbyMutationOptions = Apollo.BaseMutationOptions<ChangeHobbyMutation, ChangeHobbyMutationVariables>;
export const DeleteOneHobbyDocument = gql`
    mutation deleteOneHobby($name: String!) {
  deleteOneHobby(hobbyName: $name) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteOneHobbyMutationFn = Apollo.MutationFunction<DeleteOneHobbyMutation, DeleteOneHobbyMutationVariables>;

/**
 * __useDeleteOneHobbyMutation__
 *
 * To run a mutation, you first call `useDeleteOneHobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneHobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneHobbyMutation, { data, loading, error }] = useDeleteOneHobbyMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteOneHobbyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneHobbyMutation, DeleteOneHobbyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneHobbyMutation, DeleteOneHobbyMutationVariables>(DeleteOneHobbyDocument, options);
      }
export type DeleteOneHobbyMutationHookResult = ReturnType<typeof useDeleteOneHobbyMutation>;
export type DeleteOneHobbyMutationResult = Apollo.MutationResult<DeleteOneHobbyMutation>;
export type DeleteOneHobbyMutationOptions = Apollo.BaseMutationOptions<DeleteOneHobbyMutation, DeleteOneHobbyMutationVariables>;
export const CreateHobbyDocument = gql`
    mutation createHobby($hobby: FreeTimeInfoInput!) {
  createHobby(createHobby: $hobby) {
    leisureName
  }
}
    `;
export type CreateHobbyMutationFn = Apollo.MutationFunction<CreateHobbyMutation, CreateHobbyMutationVariables>;

/**
 * __useCreateHobbyMutation__
 *
 * To run a mutation, you first call `useCreateHobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHobbyMutation, { data, loading, error }] = useCreateHobbyMutation({
 *   variables: {
 *      hobby: // value for 'hobby'
 *   },
 * });
 */
export function useCreateHobbyMutation(baseOptions?: Apollo.MutationHookOptions<CreateHobbyMutation, CreateHobbyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHobbyMutation, CreateHobbyMutationVariables>(CreateHobbyDocument, options);
      }
export type CreateHobbyMutationHookResult = ReturnType<typeof useCreateHobbyMutation>;
export type CreateHobbyMutationResult = Apollo.MutationResult<CreateHobbyMutation>;
export type CreateHobbyMutationOptions = Apollo.BaseMutationOptions<CreateHobbyMutation, CreateHobbyMutationVariables>;