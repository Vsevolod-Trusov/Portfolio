import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFeedbackMutationVariables = Types.Exact<{
  feedback: Types.FeedbackInput;
  token: Types.Scalars['String'];
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback: { __typename?: 'Feedback', userLogin: string, review: string, estimation: number } };

export type GetFeedbacksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFeedbacksQuery = { __typename?: 'Query', getAllFeedbacks: Array<{ __typename?: 'Feedback', userLogin: string, review: string, estimation: number }> };


export const CreateFeedbackDocument = gql`
    mutation createFeedback($feedback: FeedbackInput!, $token: String!) {
  createFeedback(createFeedback: $feedback, token: $token) {
    userLogin
    review
    estimation
  }
}
    `;
export type CreateFeedbackMutationFn = Apollo.MutationFunction<CreateFeedbackMutation, CreateFeedbackMutationVariables>;

/**
 * __useCreateFeedbackMutation__
 *
 * To run a mutation, you first call `useCreateFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeedbackMutation, { data, loading, error }] = useCreateFeedbackMutation({
 *   variables: {
 *      feedback: // value for 'feedback'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useCreateFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument, options);
      }
export type CreateFeedbackMutationHookResult = ReturnType<typeof useCreateFeedbackMutation>;
export type CreateFeedbackMutationResult = Apollo.MutationResult<CreateFeedbackMutation>;
export type CreateFeedbackMutationOptions = Apollo.BaseMutationOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>;
export const GetFeedbacksDocument = gql`
    query getFeedbacks {
  getAllFeedbacks {
    userLogin
    review
    estimation
  }
}
    `;

/**
 * __useGetFeedbacksQuery__
 *
 * To run a query within a React component, call `useGetFeedbacksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedbacksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedbacksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeedbacksQuery(baseOptions?: Apollo.QueryHookOptions<GetFeedbacksQuery, GetFeedbacksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedbacksQuery, GetFeedbacksQueryVariables>(GetFeedbacksDocument, options);
      }
export function useGetFeedbacksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedbacksQuery, GetFeedbacksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedbacksQuery, GetFeedbacksQueryVariables>(GetFeedbacksDocument, options);
        }
export type GetFeedbacksQueryHookResult = ReturnType<typeof useGetFeedbacksQuery>;
export type GetFeedbacksLazyQueryHookResult = ReturnType<typeof useGetFeedbacksLazyQuery>;
export type GetFeedbacksQueryResult = Apollo.QueryResult<GetFeedbacksQuery, GetFeedbacksQueryVariables>;