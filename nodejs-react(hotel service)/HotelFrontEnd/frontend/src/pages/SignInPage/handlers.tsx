import { Dispatch } from 'react';
import { AnyAction } from 'redux';

export const sendData = (
  login: string | undefined,
  password: string | undefined,
  sendGraphQL: any,
) => {
  sendGraphQL({
    variables: { user: { login: login, password: password } },
  });
};

export const saveToken = (
  token: string,
  login: string,
  email: string,
  subscription: boolean,
) => {
  window.sessionStorage.setItem('token', token);
  window.sessionStorage.setItem('login', login);
  window.sessionStorage.setItem('email', email);
  window.sessionStorage.setItem('isSubscribed', `${subscription}`);
};
