import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { TNote } from 'pages/NoteList/types';
import { QUERY_KEYS } from 'config/globalConstants';
import {
  selectFilter,
  setPostNotes,
  setShared,
} from 'store/slices/notes.slice';
import { filterNotes, isThereNextPage } from 'utils';
import { TResponseError } from 'api/types';
import { apiClient } from 'api/base';
import { FETCH_URLS, PAGE_ELEMENTS_LIMIT } from 'api/constants';

import { START_PAGE } from './constants';
import { EMPTY_LINE } from 'pages/NoteList/constants';
import { enqueueSnackbar } from 'notistack';
import { errorSnackbar } from 'api/auth/constants';

const getSharedNotes = (): UseInfiniteQueryResult<TNote[], TResponseError> => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const handleSuccess = (data: InfiniteData<TNote[]>) => {
    const notes = data.pages.flat();
    dispatch(setShared(notes));
    dispatch(setPostNotes([...notes]));
  };

  return useInfiniteQuery(
    [QUERY_KEYS.NOTES],
    async ({ pageParam = START_PAGE }) => {
      const filterQuery = filter?.type
        ? `&${filter.type}=${filter.value}`
        : EMPTY_LINE;

      if (filter?.type) pageParam = START_PAGE;
      const url = `${FETCH_URLS.NOTES}?page=${pageParam}&limit=${PAGE_ELEMENTS_LIMIT}&isShared=true${filterQuery}`;

      const response = await apiClient.get(url);

      return response.data;
    },
    {
      onSuccess: handleSuccess,
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (currentPage, allPages) => {
        return isThereNextPage(
          currentPage.length,
          !currentPage.length,
          allPages.length,
        );
      },
    },
  );
};

export default getSharedNotes;
