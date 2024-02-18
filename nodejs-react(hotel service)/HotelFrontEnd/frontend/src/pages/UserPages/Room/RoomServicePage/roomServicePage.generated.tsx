import * as Types from '../../../../types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetRoomServicesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRoomServicesQuery = { __typename?: 'Query', getAllRoomServices: Array<{ __typename?: 'RoomService', serviceName: string, servicePrice: number, serviceDescription: string }> };


export const GetRoomServicesDocument = gql`
    query getRoomServices {
  getAllRoomServices {
    serviceName
    servicePrice
    serviceDescription
  }
}
    `;

/**
 * __useGetRoomServicesQuery__
 *
 * To run a query within a React component, call `useGetRoomServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoomServicesQuery(baseOptions?: Apollo.QueryHookOptions<GetRoomServicesQuery, GetRoomServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomServicesQuery, GetRoomServicesQueryVariables>(GetRoomServicesDocument, options);
      }
export function useGetRoomServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomServicesQuery, GetRoomServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomServicesQuery, GetRoomServicesQueryVariables>(GetRoomServicesDocument, options);
        }
export type GetRoomServicesQueryHookResult = ReturnType<typeof useGetRoomServicesQuery>;
export type GetRoomServicesLazyQueryHookResult = ReturnType<typeof useGetRoomServicesLazyQuery>;
export type GetRoomServicesQueryResult = Apollo.QueryResult<GetRoomServicesQuery, GetRoomServicesQueryVariables>;