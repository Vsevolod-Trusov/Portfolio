export const RESPONSES = {
  WRONG_EMAIL: 'Wrong email',
  WRONG_PASSWORD: 'Wrong password',
  SUCCESS: 'Welcome',
  SUCH_EMAIL_USED: 'Such email already used',
  CONFIRM_PASSWORDS: 'Confirm password not passed',
};
export const AUTO_HIDE_DURATION = 1000;
export const enum VARIANTS {
  ERROR = 'error',
  SUCCESS = 'success',
}
export const errorSnackbar = {
  variant: VARIANTS.ERROR,
  autoHideDuration: AUTO_HIDE_DURATION,
};
export const successSnackbar = {
  variant: VARIANTS.SUCCESS,
  autoHideDuration: AUTO_HIDE_DURATION,
};
export enum ROLES {
  USER = 'user',
}

export const X_REFRESH_TOKEN = 'x-refresh-token';
export const X_ACCESS_TOKEN = 'x-access-token';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
