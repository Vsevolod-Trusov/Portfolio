const defaultState = {
  tours: [],
  selectedTour: {},
  tourDate: null,
  tourAdultsAmount: 1,

  adminSelectedTour: {},
  adminTours: [],

  adminCreatedTour: {
    adminTourStart: null,
    adminTourEnd: null,
    adminTourPrice: '',
    adminTourName: '',
    adminTourDescription: '',
  },

  adminSuccessMessage: '',
  adminErrorMessage: '',

  selectedTourOrder: {},
};

const SET_TOURS = 'SET_TOURS';
const SET_SELECT_TOUR = 'SET_SELECT_TOUR';
const SET_TOUR_DATE = 'SET_TOUR_DATE';
const SET_TOUR_ADULTS_AMOUNT = 'SET_TOUR_ADULTS_AMOUNT';

const SET_ADMIN_TOUR = 'SET_ADMIN_TOUR';
const SET_ADMIN_TOURS = 'SET_ADMIN_TOURS';
const SET_ADMIN_CREATING_TOUR = 'SET_ADMIN_CREATING_TOUR';
const SET_ADMIN_SUCCESS = 'SET_ADMIN_SUCCESS';
const SET_ADMIN_ERROR = 'SET_ADMIN_ERROR';

const SET_TOUR_ORDER = 'SET_TOUR_ORDER';

export const tourReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_TOURS:
      return { ...state, tours: action.payload };
    case SET_SELECT_TOUR:
      return { ...state, selectedTour: action.payload };
    case SET_TOUR_DATE:
      return { ...state, tourDate: action.payload };
    case SET_TOUR_ADULTS_AMOUNT:
      return { ...state, tourAdultsAmount: action.payload };
    case SET_ADMIN_TOUR:
      return { ...state, adminSelectedTour: action.payload };
    case SET_ADMIN_TOURS:
      return { ...state, adminTours: action.payload };
    case SET_ADMIN_CREATING_TOUR:
      return { ...state, adminCreatedTour: action.payload };
    case SET_ADMIN_SUCCESS:
      return { ...state, adminSuccessMessage: action.payload };
    case SET_ADMIN_ERROR:
      return { ...state, adminErrorMessage: action.payload };
    case SET_TOUR_ORDER:
      return { ...state, selectedTourOrder: action.payload };
    default:
      return state;
  }
};

export const setToursAction = (payload: any) => ({
  type: SET_TOURS,
  payload,
});

export const setSelectTourAction = (payload: any) => ({
  type: SET_SELECT_TOUR,
  payload,
});

export const setTourDateAction = (payload: any) => ({
  type: SET_TOUR_DATE,
  payload,
});

export const setTourAdultsAmountAction = (payload: any) => ({
  type: SET_TOUR_ADULTS_AMOUNT,
  payload,
});

export const setAdminTourAction = (payload: any) => ({
  type: SET_ADMIN_TOUR,
  payload,
});

export const setAdminToursAction = (payload: any) => ({
  type: SET_ADMIN_TOURS,
  payload,
});

export const setAdminCreatingTourAction = (payload: any) => ({
  type: SET_ADMIN_CREATING_TOUR,
  payload,
});

export const setAdminSuccessAction = (payload: any) => ({
  type: SET_ADMIN_SUCCESS,
  payload,
});

export const setAdminErrorAction = (payload: any) => ({
  type: SET_ADMIN_ERROR,
  payload,
});

export const setTourOrderAction = (payload: any) => ({
  type: SET_TOUR_ORDER,
  payload,
});
