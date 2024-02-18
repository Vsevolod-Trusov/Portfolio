import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

import { TNote, TUpdateNote } from 'pages/NoteList/types';
import { LOCAL_STORAGE_NAMES, QUERY_KEYS } from 'config/globalConstants';
import { ROUTE } from 'config/constants/routes';
import { setSelectedNote } from 'store/slices/notes.slice';
import { INITIAL_STATE } from 'pages/NoteList/constants';
import { TResponseError } from 'api/types';
import { apiClient } from 'api/base';
import { FETCH_URLS } from 'api/constants';
import { errorSnackbar } from 'api/auth/constants';

const editNote = (id, isShared): UseMutationResult<TNote[], TResponseError> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTES] });
    localStorage.removeItem(LOCAL_STORAGE_NAMES.SELECTED);
    dispatch(setSelectedNote(INITIAL_STATE));

    navigate(isShared ? ROUTE.SHARED : ROUTE.NOTES);
  };

  const handleError = ({ message }: TResponseError) => {
    enqueueSnackbar(message, errorSnackbar);
  };

  return useMutation({
    mutationFn: async (updatedNode: TUpdateNote) => {
      const url = `${FETCH_URLS.NOTES}/${id}`;
      return await apiClient.put(url, updatedNode);
    },

    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default editNote;
