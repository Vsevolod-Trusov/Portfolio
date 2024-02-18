import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTablesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTablesQuery = { __typename?: 'Query', getAllTables: Array<{ __typename?: 'PlaceTable', tableNumber: string, amountSeats: number }> };

export type DeleteTableMutationVariables = Types.Exact<{
  number: Types.Scalars['String'];
}>;


export type DeleteTableMutation = { __typename?: 'Mutation', deleteOneTable: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type UpdateTableMutationVariables = Types.Exact<{
  table: Types.PlaceTableInput;
}>;


export type UpdateTableMutation = { __typename?: 'Mutation', updateTable: { __typename?: 'PlaceTable', tableNumber: string, amountSeats: number } };

export type GetAmountTablesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAmountTablesQuery = { __typename?: 'Query', getAmountTables: number };

export type CreateTableMutationVariables = Types.Exact<{
  table: Types.PlaceTableInput;
}>;


export type CreateTableMutation = { __typename?: 'Mutation', createTable: { __typename?: 'PlaceTable', tableNumber: string, status: string, amountSeats: number } };


export const GetTablesDocument = gql`
    query getTables {
  getAllTables {
    tableNumber
    amountSeats
  }
}
    `;

/**
 * __useGetTablesQuery__
 *
 * To run a query within a React component, call `useGetTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTablesQuery(baseOptions?: Apollo.QueryHookOptions<GetTablesQuery, GetTablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTablesQuery, GetTablesQueryVariables>(GetTablesDocument, options);
      }
export function useGetTablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTablesQuery, GetTablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTablesQuery, GetTablesQueryVariables>(GetTablesDocument, options);
        }
export type GetTablesQueryHookResult = ReturnType<typeof useGetTablesQuery>;
export type GetTablesLazyQueryHookResult = ReturnType<typeof useGetTablesLazyQuery>;
export type GetTablesQueryResult = Apollo.QueryResult<GetTablesQuery, GetTablesQueryVariables>;
export const DeleteTableDocument = gql`
    mutation deleteTable($number: String!) {
  deleteOneTable(tableNumber: $number) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteTableMutationFn = Apollo.MutationFunction<DeleteTableMutation, DeleteTableMutationVariables>;

/**
 * __useDeleteTableMutation__
 *
 * To run a mutation, you first call `useDeleteTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTableMutation, { data, loading, error }] = useDeleteTableMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useDeleteTableMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTableMutation, DeleteTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTableMutation, DeleteTableMutationVariables>(DeleteTableDocument, options);
      }
export type DeleteTableMutationHookResult = ReturnType<typeof useDeleteTableMutation>;
export type DeleteTableMutationResult = Apollo.MutationResult<DeleteTableMutation>;
export type DeleteTableMutationOptions = Apollo.BaseMutationOptions<DeleteTableMutation, DeleteTableMutationVariables>;
export const UpdateTableDocument = gql`
    mutation updateTable($table: PlaceTableInput!) {
  updateTable(table: $table) {
    tableNumber
    amountSeats
  }
}
    `;
export type UpdateTableMutationFn = Apollo.MutationFunction<UpdateTableMutation, UpdateTableMutationVariables>;

/**
 * __useUpdateTableMutation__
 *
 * To run a mutation, you first call `useUpdateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTableMutation, { data, loading, error }] = useUpdateTableMutation({
 *   variables: {
 *      table: // value for 'table'
 *   },
 * });
 */
export function useUpdateTableMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTableMutation, UpdateTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTableMutation, UpdateTableMutationVariables>(UpdateTableDocument, options);
      }
export type UpdateTableMutationHookResult = ReturnType<typeof useUpdateTableMutation>;
export type UpdateTableMutationResult = Apollo.MutationResult<UpdateTableMutation>;
export type UpdateTableMutationOptions = Apollo.BaseMutationOptions<UpdateTableMutation, UpdateTableMutationVariables>;
export const GetAmountTablesDocument = gql`
    query getAmountTables {
  getAmountTables
}
    `;

/**
 * __useGetAmountTablesQuery__
 *
 * To run a query within a React component, call `useGetAmountTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAmountTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAmountTablesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAmountTablesQuery(baseOptions?: Apollo.QueryHookOptions<GetAmountTablesQuery, GetAmountTablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAmountTablesQuery, GetAmountTablesQueryVariables>(GetAmountTablesDocument, options);
      }
export function useGetAmountTablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAmountTablesQuery, GetAmountTablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAmountTablesQuery, GetAmountTablesQueryVariables>(GetAmountTablesDocument, options);
        }
export type GetAmountTablesQueryHookResult = ReturnType<typeof useGetAmountTablesQuery>;
export type GetAmountTablesLazyQueryHookResult = ReturnType<typeof useGetAmountTablesLazyQuery>;
export type GetAmountTablesQueryResult = Apollo.QueryResult<GetAmountTablesQuery, GetAmountTablesQueryVariables>;
export const CreateTableDocument = gql`
    mutation createTable($table: PlaceTableInput!) {
  createTable(createTable: $table) {
    tableNumber
    status
    amountSeats
  }
}
    `;
export type CreateTableMutationFn = Apollo.MutationFunction<CreateTableMutation, CreateTableMutationVariables>;

/**
 * __useCreateTableMutation__
 *
 * To run a mutation, you first call `useCreateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTableMutation, { data, loading, error }] = useCreateTableMutation({
 *   variables: {
 *      table: // value for 'table'
 *   },
 * });
 */
export function useCreateTableMutation(baseOptions?: Apollo.MutationHookOptions<CreateTableMutation, CreateTableMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTableMutation, CreateTableMutationVariables>(CreateTableDocument, options);
      }
export type CreateTableMutationHookResult = ReturnType<typeof useCreateTableMutation>;
export type CreateTableMutationResult = Apollo.MutationResult<CreateTableMutation>;
export type CreateTableMutationOptions = Apollo.BaseMutationOptions<CreateTableMutation, CreateTableMutationVariables>;