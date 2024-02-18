const defaultState = {
  isDark: false,
};

const SET_THEME = 'SET_THEME';

export const themeReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const setThemeAction = (payload: string) => ({
  type: SET_THEME,
  payload,
});
