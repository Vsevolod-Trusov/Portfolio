const defaultState = {
  selectedHobby: {},
  hobbies: [],

  creatingHobby: {
    name: '',
    description: '',
    price: '',
  },

  hobbySuccess: '',
  hobbyError: '',
};

const SET_HOBBY = 'SET_HOBBY';
const SET_HOBBIES = 'SET_HOBBIES';
const SET_CREATING_HOBBY = 'SET_CREATING_HOBBY';
const SET_HOBBY_SUCCESS = 'SET_HOBBY_SUCCESS';
const SET_HOBBY_ERROR = 'SET_HOBBY_ERROR';

export const hobbyReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_HOBBY:
      return { ...state, selectedHobby: action.payload };
    case SET_HOBBIES:
      return { ...state, hobbies: action.payload };
    case SET_CREATING_HOBBY:
      return { ...state, creatingHobby: action.payload };
    case SET_HOBBY_SUCCESS:
      return { ...state, hobbySuccess: action.payload };
    case SET_HOBBY_ERROR:
      return { ...state, hobbyError: action.payload };

    default:
      return state;
  }
};

export const setHobbyAction = (payload: any) => ({
  type: SET_HOBBY,
  payload,
});

export const setHobbiesAction = (payload: any) => ({
  type: SET_HOBBIES,
  payload,
});

export const setCreatingHobby = (payload: any) => ({
  type: SET_CREATING_HOBBY,
  payload,
});

export const setHobbySuccessAction = (payload: any) => ({
  type: SET_HOBBY_SUCCESS,
  payload,
});

export const setHobbyErrorAction = (payload: any) => ({
  type: SET_HOBBY_ERROR,
  payload,
});
