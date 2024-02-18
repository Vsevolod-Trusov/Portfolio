import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { TNote } from 'pages/NoteList/types';
import { QUERY_KEYS } from 'config/globalConstants';
import { ROUTE } from 'config/constants/routes';
import { FETCH_URLS } from 'api/constants';
import { apiClient } from 'api/base';
import { TResponseError } from 'api/types';

const createNote = (): UseMutationResult<TNote, TResponseError> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTES] });
    navigate(ROUTE.NOTES);
  };

  return useMutation({
    mutationFn: async (note: TNote) =>
      await apiClient.post(FETCH_URLS.NOTES, note),
    onSuccess: handleSuccess,
  });
};

export default createNote;
