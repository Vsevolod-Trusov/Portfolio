import * as Types from '../../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ToursQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ToursQuery = { __typename?: 'Query', getAllTours: Array<{ __typename?: 'Tour', tourName: string, tourPrice: number, startDate: any, endDate: any, description: string }> };

export type TourOrdersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TourOrdersQuery = { __typename?: 'Query', getAllOrderTours: Array<{ __typename?: 'OrderTour', _id: string, tourName: string, peopleAmount: number, orderPrice: number, tourDate: any, userLogin: string }> };

export type UpdateTourMutationVariables = Types.Exact<{
  tour: Types.TourInput;
}>;


export type UpdateTourMutation = { __typename?: 'Mutation', updateTour: { __typename?: 'Tour', tourName: string, tourPrice: number, description: string, startDate: any, endDate: any } };

export type DeleteOneTourMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type DeleteOneTourMutation = { __typename?: 'Mutation', deleteOneTour: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };

export type DeleteTourOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteTourOrderMutation = { __typename?: 'Mutation', deleteOneTourOrder: { __typename?: 'Deleted', acknowledged: boolean, deletedCount: number } };


export const ToursDocument = gql`
    query tours {
  getAllTours {
    tourName
    tourPrice
    startDate
    endDate
    description
  }
}
    `;

/**
 * __useToursQuery__
 *
 * To run a query within a React component, call `useToursQuery` and pass it any options that fit your needs.
 * When your component renders, `useToursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToursQuery({
 *   variables: {
 *   },
 * });
 */
export function useToursQuery(baseOptions?: Apollo.QueryHookOptions<ToursQuery, ToursQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToursQuery, ToursQueryVariables>(ToursDocument, options);
      }
export function useToursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToursQuery, ToursQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToursQuery, ToursQueryVariables>(ToursDocument, options);
        }
export type ToursQueryHookResult = ReturnType<typeof useToursQuery>;
export type ToursLazyQueryHookResult = ReturnType<typeof useToursLazyQuery>;
export type ToursQueryResult = Apollo.QueryResult<ToursQuery, ToursQueryVariables>;
export const TourOrdersDocument = gql`
    query tourOrders {
  getAllOrderTours {
    _id
    tourName
    peopleAmount
    orderPrice
    tourDate
    userLogin
  }
}
    `;

/**
 * __useTourOrdersQuery__
 *
 * To run a query within a React component, call `useTourOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useTourOrdersQuery(baseOptions?: Apollo.QueryHookOptions<TourOrdersQuery, TourOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TourOrdersQuery, TourOrdersQueryVariables>(TourOrdersDocument, options);
      }
export function useTourOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourOrdersQuery, TourOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TourOrdersQuery, TourOrdersQueryVariables>(TourOrdersDocument, options);
        }
export type TourOrdersQueryHookResult = ReturnType<typeof useTourOrdersQuery>;
export type TourOrdersLazyQueryHookResult = ReturnType<typeof useTourOrdersLazyQuery>;
export type TourOrdersQueryResult = Apollo.QueryResult<TourOrdersQuery, TourOrdersQueryVariables>;
export const UpdateTourDocument = gql`
    mutation updateTour($tour: TourInput!) {
  updateTour(tour: $tour) {
    tourName
    tourPrice
    description
    startDate
    endDate
  }
}
    `;
export type UpdateTourMutationFn = Apollo.MutationFunction<UpdateTourMutation, UpdateTourMutationVariables>;

/**
 * __useUpdateTourMutation__
 *
 * To run a mutation, you first call `useUpdateTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTourMutation, { data, loading, error }] = useUpdateTourMutation({
 *   variables: {
 *      tour: // value for 'tour'
 *   },
 * });
 */
export function useUpdateTourMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTourMutation, UpdateTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTourMutation, UpdateTourMutationVariables>(UpdateTourDocument, options);
      }
export type UpdateTourMutationHookResult = ReturnType<typeof useUpdateTourMutation>;
export type UpdateTourMutationResult = Apollo.MutationResult<UpdateTourMutation>;
export type UpdateTourMutationOptions = Apollo.BaseMutationOptions<UpdateTourMutation, UpdateTourMutationVariables>;
export const DeleteOneTourDocument = gql`
    mutation deleteOneTour($name: String!) {
  deleteOneTour(tourName: $name) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteOneTourMutationFn = Apollo.MutationFunction<DeleteOneTourMutation, DeleteOneTourMutationVariables>;

/**
 * __useDeleteOneTourMutation__
 *
 * To run a mutation, you first call `useDeleteOneTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneTourMutation, { data, loading, error }] = useDeleteOneTourMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteOneTourMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneTourMutation, DeleteOneTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOneTourMutation, DeleteOneTourMutationVariables>(DeleteOneTourDocument, options);
      }
export type DeleteOneTourMutationHookResult = ReturnType<typeof useDeleteOneTourMutation>;
export type DeleteOneTourMutationResult = Apollo.MutationResult<DeleteOneTourMutation>;
export type DeleteOneTourMutationOptions = Apollo.BaseMutationOptions<DeleteOneTourMutation, DeleteOneTourMutationVariables>;
export const DeleteTourOrderDocument = gql`
    mutation deleteTourOrder($id: String!) {
  deleteOneTourOrder(orderId: $id) {
    acknowledged
    deletedCount
  }
}
    `;
export type DeleteTourOrderMutationFn = Apollo.MutationFunction<DeleteTourOrderMutation, DeleteTourOrderMutationVariables>;

/**
 * __useDeleteTourOrderMutation__
 *
 * To run a mutation, you first call `useDeleteTourOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTourOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTourOrderMutation, { data, loading, error }] = useDeleteTourOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTourOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTourOrderMutation, DeleteTourOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTourOrderMutation, DeleteTourOrderMutationVariables>(DeleteTourOrderDocument, options);
      }
export type DeleteTourOrderMutationHookResult = ReturnType<typeof useDeleteTourOrderMutation>;
export type DeleteTourOrderMutationResult = Apollo.MutationResult<DeleteTourOrderMutation>;
export type DeleteTourOrderMutationOptions = Apollo.BaseMutationOptions<DeleteTourOrderMutation, DeleteTourOrderMutationVariables>;