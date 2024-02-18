import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { setUser } from 'store/slices/user.slice';
import { LOCAL_STORAGE_NAMES, QUERY_KEYS } from 'config/globalConstants';
import { ROUTE } from 'config/constants/routes';

import { TResponseError } from '../types';
import { FETCH_URLS } from '../constants';
import { apiClient } from '../base';
import { TUser, ISignUpResponse, TUserParameters } from './types';
import {
  errorSnackbar,
  RESPONSES,
  successSnackbar,
  X_ACCESS_TOKEN,
  X_REFRESH_TOKEN,
} from './constants';

const useSignIn = (): UseMutationResult<TUserParameters, TResponseError> => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSuccess = ({ user, email, password }: ISignUpResponse) => {
    enqueueSnackbar(RESPONSES.SUCCESS, successSnackbar);

    dispatch(setUser(user));
    window.localStorage.setItem(LOCAL_STORAGE_NAMES.USER, JSON.stringify(user));
    navigate(ROUTE.PROFILE);
  };

  const handleError = ({ message }: TResponseError) => {
    enqueueSnackbar(message, errorSnackbar);
  };

  return useMutation({
    mutationKey: [QUERY_KEYS.USERS],

    mutationFn: async ({ email, password }: TUser) => {
      const url = FETCH_URLS.SIGN_IN;
      const response = await apiClient.post(url, { email, password });

      return { user: response.data.user, email: email, password: password };
    },

    onSuccess: handleSuccess,
    onError: handleError,
    retry: false,
  });
};

export default useSignIn;
