import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { QUERY_KEYS } from 'config/globalConstants';
import { ROUTE } from 'config/constants/routes';
import { IUser } from 'pages/SignUp/types';
import { stringIsEquals } from 'utils';

import { TResponseError } from '../types';
import { FETCH_URLS } from '../constants';
import { apiClient } from '../base';
import { TUser } from './types';
import { errorSnackbar, RESPONSES, ROLES, successSnackbar } from './constants';

export const useSignUp = (): UseMutationResult<TUser, TResponseError> => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSuccess = () => {
    enqueueSnackbar(RESPONSES.SUCCESS, successSnackbar);

    navigate(ROUTE.SIGN_IN);
  };

  const handleError = (error) => {
    enqueueSnackbar(error.message, errorSnackbar);
  };

  return useMutation({
    mutationKey: [QUERY_KEYS.USERS],

    mutationFn: async (newUser: IUser) => {
      const url = FETCH_URLS.SIGN_UP;

      if (!stringIsEquals(newUser.password, newUser.confirmPassword)) {
        throw new Error(RESPONSES.CONFIRM_PASSWORDS);
      }

      return await apiClient.post(url, { ...newUser, role: ROLES.USER });
    },

    onSuccess: handleSuccess,
    onError: handleError,
    retry: false,
  });
};

export default useSignUp;
