import * as Types from '../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNewsMutationVariables = Types.Exact<{
  news: Types.NewsInput;
}>;


export type CreateNewsMutation = { __typename?: 'Mutation', createNews: Array<{ __typename?: 'News', newsHeader: string }> };


export const CreateNewsDocument = gql`
    mutation createNews($news: NewsInput!) {
  createNews(news: $news) {
    newsHeader
  }
}
    `;
export type CreateNewsMutationFn = Apollo.MutationFunction<CreateNewsMutation, CreateNewsMutationVariables>;

/**
 * __useCreateNewsMutation__
 *
 * To run a mutation, you first call `useCreateNewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewsMutation, { data, loading, error }] = useCreateNewsMutation({
 *   variables: {
 *      news: // value for 'news'
 *   },
 * });
 */
export function useCreateNewsMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewsMutation, CreateNewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewsMutation, CreateNewsMutationVariables>(CreateNewsDocument, options);
      }
export type CreateNewsMutationHookResult = ReturnType<typeof useCreateNewsMutation>;
export type CreateNewsMutationResult = Apollo.MutationResult<CreateNewsMutation>;
export type CreateNewsMutationOptions = Apollo.BaseMutationOptions<CreateNewsMutation, CreateNewsMutationVariables>;