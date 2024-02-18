import * as Types from '../../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTourMutationVariables = Types.Exact<{
  tour: Types.TourInput;
}>;


export type CreateTourMutation = { __typename?: 'Mutation', createTour: { __typename?: 'Tour', tourName: string, description: string, startDate: any, endDate: any, tourPrice: number } };


export const CreateTourDocument = gql`
    mutation createTour($tour: TourInput!) {
  createTour(createTour: $tour) {
    tourName
    description
    startDate
    endDate
    tourPrice
  }
}
    `;
export type CreateTourMutationFn = Apollo.MutationFunction<CreateTourMutation, CreateTourMutationVariables>;

/**
 * __useCreateTourMutation__
 *
 * To run a mutation, you first call `useCreateTourMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTourMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTourMutation, { data, loading, error }] = useCreateTourMutation({
 *   variables: {
 *      tour: // value for 'tour'
 *   },
 * });
 */
export function useCreateTourMutation(baseOptions?: Apollo.MutationHookOptions<CreateTourMutation, CreateTourMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTourMutation, CreateTourMutationVariables>(CreateTourDocument, options);
      }
export type CreateTourMutationHookResult = ReturnType<typeof useCreateTourMutation>;
export type CreateTourMutationResult = Apollo.MutationResult<CreateTourMutation>;
export type CreateTourMutationOptions = Apollo.BaseMutationOptions<CreateTourMutation, CreateTourMutationVariables>;