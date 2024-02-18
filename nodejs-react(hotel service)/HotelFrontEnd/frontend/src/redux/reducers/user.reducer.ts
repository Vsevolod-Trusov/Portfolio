const defaultState = {
  token: '',
  refreshToken: '',
  login: '',
  role: '',
};

const SET_TOKEN = 'SET_TOKEN';
const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';
const SET_ROLE = 'SET_ROLE';
const SET_LOGIN = 'SET_LOGIN';

export const userReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_LOGIN:
      return { ...state, login: action.payload };
    case SET_REFRESH_TOKEN:
      return { ...state, refreshToken: action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
    default:
      return state;
  }
};

export const setTokenAction = (payload: string) => ({
  type: SET_TOKEN,
  payload,
});

export const setLoginAction = (payload: string) => ({
  type: SET_LOGIN,
  payload,
});

export const setRefreshToken = (payload: string) => ({
  type: SET_REFRESH_TOKEN,
  payload,
});

export const setRoleAction = (payload: string) => ({
  type: SET_ROLE,
  payload,
});
