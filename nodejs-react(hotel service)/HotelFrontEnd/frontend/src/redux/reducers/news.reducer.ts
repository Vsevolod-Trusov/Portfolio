const defaultState = {
  news: [],
  createdNew: {
    newsHeader: '',
    newsContent: '',
  },

  successMessage: '',
  errorMessage: '',
};

const SET_NEWS = 'SET_NEWS';
const SET_CREATED_NEW = 'SET_CREATED_NEW';
const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const newsReducer = (state = defaultState, action: any) => {
  if (action.type === SET_SUCCESS_MESSAGE) {
  }
  switch (action.type) {
    case SET_NEWS:
      return { ...state, news: action.payload };
    case SET_CREATED_NEW:
      return { ...state, createdNew: action.payload };
    case SET_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export const setNewsAction = (payload: any) => ({
  type: SET_NEWS,
  payload,
});

export const setCreatedNewAction = (payload: any) => ({
  type: SET_CREATED_NEW,
  payload,
});

export const setSuccessMessageAction = (payload: any) => ({
  type: SET_SUCCESS_MESSAGE,
  payload,
});

export const setErrorMessageAction = (payload: any) => ({
  type: SET_ERROR_MESSAGE,
  payload,
});
