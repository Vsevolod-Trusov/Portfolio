import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';

import { QUERY_KEYS } from 'config/globalConstants';
import { selectEmail } from 'store/slices/user.slice';
import {
  selectFilter,
  setPostNotes,
  setReduxNotes,
} from 'store/slices/notes.slice';
import { TNote } from 'pages/NoteList/types';
import { filterNotes, isThereNextPage } from 'utils';
import { TResponseError } from 'api/types';
import { apiClient } from 'api/base';
import { FETCH_URLS, PAGE_ELEMENTS_LIMIT } from 'api/constants';

import { START_PAGE } from './constants';
import { EMPTY_LINE } from 'pages/NoteList/constants';
import { enqueueSnackbar } from 'notistack';
import { errorSnackbar } from 'api/auth/constants';

const getNotes = (): UseInfiniteQueryResult<TNote, TResponseError> => {
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleSuccess = async (data: InfiniteData<TNote>) => {
    const notes = data.pages.flat();
    dispatch(setReduxNotes(notes));
    dispatch(setPostNotes([...notes]));
  };

  const handleError = ({ message }: TResponseError) => {
    enqueueSnackbar(message, errorSnackbar);
  };

  return useInfiniteQuery(
    [QUERY_KEYS.NOTES],
    async ({ pageParam = START_PAGE }) => {
      const filter = JSON.parse(window.localStorage.getItem('filter'));

      const filterQuery = filter?.type
        ? `&${filter.type}=${filter.value}`
        : EMPTY_LINE;

      if (filter?.type) pageParam = START_PAGE;

      const url = `${FETCH_URLS.NOTES}?page=${pageParam}&limit=${PAGE_ELEMENTS_LIMIT}&author=${email}${filterQuery}`;
      const response = await apiClient.get(url);

      return response.data;
    },
    {
      onSuccess: handleSuccess,
      onError: handleError,
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

export default getNotes;
