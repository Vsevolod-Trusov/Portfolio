export const initialChangingTableState = {
  tableNumber: '',
  amountSeats: '',
};

export const initialCreatingTableState = {
  tableNumber: '',
  amountSeats: '2',
};

const defaultState = {
  meals: [],
  selectedMeals: [],
  selectedMeal: {},

  tables: [],
  selectedTable: null,
  inRoom: false,

  bookDate: null,
  selectedBookTime: null,

  availableBookTimes: [],

  adminDeletingOrderMeal: {},
  adminChangingMeal: {},
  creatingMeal: {
    name: '',
    description: '',
    price: '',
  },
  mealSuccess: '',
  mealError: '',

  changingTable: initialChangingTableState,

  creatingTable: initialCreatingTableState,
  tableSuccess: '',
  tableError: '',
};

const SET_MEALS = 'SET_MEALS';
const SET_SELECT_MEALS = 'SET_SELECT_MEALS';
const SET_SELECT_MEAL = 'SET_SELECT_MEAL';

const SET_TABLES = 'SET_TABLES';
const SET_SELECT_TABLE = 'SET_SELECT_TABLE';
const SET_IN_ROOM = 'SET_IN_ROOM';

const SET_BOOK_DATE = 'SET_BOOK_DATE';
const SET_SELECT_BOOK_TIME = 'SET_SELECT_BOOK_TIME';
const SET_ADMIN_DELETING_ORDER_MEAL = 'SET_ADMIN_DELETING_ORDER_MEAL';
const SET_ADMIN_CHANGING_MEAL = 'SET_ADMIN_CHANGING_MEAL';
const SET_CREATING_MEAL = 'SET_CREATING_MEAL';
const SET_MEAL_SUCCESS = 'SET_MEAL_SUCCESS';
const SET_MEAL_ERROR = 'SET_MEAL_ERROR';

const SET_CHANGING_TABLE = 'SET_CHANGING_TABLE';
const SET_CREATING_TABLE = 'SET_CREATING_TABLE';
const SET_TABLE_SUCCESS = 'SET_TABLE_SUCCESS';
const SET_TABLE_ERROR = 'SET_TABLE_ERROR';
const SET_AVAILABLE_BOOK_TIMES = 'SET_AVAILABLE_BOOK_TIMES';

export const mealReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_MEALS:
      return { ...state, meals: action.payload };
    case SET_SELECT_MEALS:
      return { ...state, selectedMeals: action.payload };
    case SET_SELECT_MEAL:
      return { ...state, selectedMeal: action.payload };
    case SET_TABLES:
      return { ...state, tables: action.payload };
    case SET_SELECT_TABLE:
      return { ...state, selectedTable: action.payload };
    case SET_IN_ROOM:
      return { ...state, inRoom: action.payload };
    case SET_BOOK_DATE:
      return { ...state, bookDate: action.payload };
    case SET_SELECT_BOOK_TIME:
      return { ...state, selectedBookTime: action.payload };
    case SET_ADMIN_DELETING_ORDER_MEAL:
      return { ...state, adminDeletingOrderMeal: action.payload };
    case SET_ADMIN_CHANGING_MEAL:
      return { ...state, adminChangingMeal: action.payload };
    case SET_CREATING_MEAL:
      return { ...state, creatingMeal: action.payload };
    case SET_MEAL_SUCCESS:
      return { ...state, mealSuccess: action.payload };
    case SET_MEAL_ERROR:
      return { ...state, mealError: action.payload };
    case SET_CHANGING_TABLE:
      return { ...state, changingTable: action.payload };
    case SET_CREATING_TABLE:
      return { ...state, creatingTable: action.payload };
    case SET_TABLE_SUCCESS:
      return { ...state, tableSuccess: action.payload };
    case SET_TABLE_ERROR:
      return { ...state, tableError: action.payload };
    case SET_AVAILABLE_BOOK_TIMES:
      return { ...state, availableBookTimes: action.payload };

    default:
      return state;
  }
};

export const setMealsAction = (payload: any) => ({
  type: SET_MEALS,
  payload,
});

export const setSelectMealsAction = (payload: any) => ({
  type: SET_SELECT_MEALS,
  payload,
});

export const setSelectMealAction = (payload: any) => ({
  type: SET_SELECT_MEAL,
  payload,
});

export const setTablesAction = (payload: any) => ({
  type: SET_TABLES,
  payload,
});

export const setSelectTableAction = (payload: any) => ({
  type: SET_SELECT_TABLE,
  payload,
});

export const setInRoomAction = (payload: any) => ({
  type: SET_IN_ROOM,
  payload,
});

export const setBookDateAction = (payload: any) => ({
  type: SET_BOOK_DATE,
  payload,
});

export const setSelectBookTime = (payload: any) => ({
  type: SET_SELECT_BOOK_TIME,
  payload,
});

export const setDeletingOrderMealAction = (payload: any) => ({
  type: SET_ADMIN_DELETING_ORDER_MEAL,
  payload,
});

export const setChangingMealAction = (payload: any) => ({
  type: SET_ADMIN_CHANGING_MEAL,
  payload,
});

export const setCreatingMealAction = (payload: any) => ({
  type: SET_CREATING_MEAL,
  payload,
});

export const setMealSuccessAction = (payload: any) => ({
  type: SET_MEAL_SUCCESS,
  payload,
});

export const setMealErrorAction = (payload: any) => ({
  type: SET_MEAL_ERROR,
  payload,
});

export const setChangingTableAction = (payload: any) => ({
  type: SET_CHANGING_TABLE,
  payload,
});

export const setCreatingTableAction = (payload: any) => ({
  type: SET_CREATING_TABLE,
  payload,
});

export const setTableSuccessAction = (payload: any) => ({
  type: SET_TABLE_SUCCESS,
  payload,
});

export const setTableErrorAction = (payload: any) => ({
  type: SET_TABLE_ERROR,
  payload,
});

export const setAvailableBookTimes = (payload: any) => ({
  type: SET_AVAILABLE_BOOK_TIMES,
  payload,
});
