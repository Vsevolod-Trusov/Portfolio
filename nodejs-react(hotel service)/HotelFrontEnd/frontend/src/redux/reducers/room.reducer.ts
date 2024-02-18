import { AMOUNT_BED_OPTIONS } from '../../components/composites/ChangeForm/ChangeRoomForm/ChangeRoomForm';
import { ROOM_TYPE_OPTIONS } from '../../pages/AdminPages/Room/СreateRoomPage/CreateRoomForm';

export const initialChangingRoomState = {
  roomNumber: '',
  roomType: {
    amountBed: '',
    basePrice: '',
    type: '',
  },
};

export const initialCreatingRoomState = {
  roomNumber: '',
  roomType: {
    amountBed: AMOUNT_BED_OPTIONS[0].value,
    basePrice: '',
    type: ROOM_TYPE_OPTIONS[0].value,
  },
};

const defaultState = {
  roomTypes: [],
  selectedRoomServices: [],
  selectedRoomType: {},
  adultsAmount: 1,
  orderPrice: 0.0,
  startDate: null,
  finishDate: null,

  deletingRoomOrder: {},
  changingRoom: initialChangingRoomState,
  creatingRoom: initialCreatingRoomState,

  changingRoomService: {
    name: '',
    description: '',
    price: '',
  },

  creatingService: {
    name: '',
    description: '',
    price: '',
  },
  serviceSuccess: '',
  serviceError: '',

  roomSuccess: '',
  roomError: '',
};

const SET_ROOM_TYPE = 'SET_ROOM_TYPE';
const SET_SELECT_ROOM_SERVICE = 'SET_SELECT_ROOM_SERVICE';
const SET_SELECT_ROOM_TYPE = 'SET_SELECT_ROOM_TYPE';
const SET_ADULTS = 'SET_ADULTS';
const SET_START_DATE = 'SET_START_DATE';
const SET_FINISH_DATE = 'SET_FINISH_DATE';
const SET_ORDER_PRICE = 'SET_ORDER_PRICE';

const SET_DELETING_ORDER_ROOM = 'SET_DELETING_ORDER_ROOM';
const SET_CHANGING_ROOM = 'SET_CHANGING_ROOM';
const SET_CREATING_ROOM = 'SET_CREATING_ROOM';
const SET_ROOM_SUCCESS = 'SET_ROOM_SUCCESS';
const SET_ROOM_ERROR = 'SET_ROOM_ERROR';
const SET_CHANGING_ROOM_SERVICE = 'SET_CHANGING_ROOM_SERVICE';
const SET_CREATING_ROOM_SERVICE = 'SET_CREATING_ROOM_SERVICE';
const SET_SERVICE_SUCCESS = 'SET_SERVICE_SUCCESS';
const SET_SERVICE_ERROR = 'SET_SERVICE_ERROR';

export const roomReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_ROOM_TYPE:
      return { ...state, roomTypes: action.payload };
    case SET_SELECT_ROOM_SERVICE:
      return { ...state, selectedRoomServices: action.payload };
    case SET_SELECT_ROOM_TYPE:
      return { ...state, selectedRoomType: action.payload };
    case SET_ADULTS:
      return { ...state, adultsAmount: action.payload };
    case SET_START_DATE:
      return { ...state, startDate: action.payload };
    case SET_FINISH_DATE:
      return { ...state, finishDate: action.payload };
    case SET_ORDER_PRICE:
      return { ...state, orderPrice: action.payload };
    case SET_DELETING_ORDER_ROOM:
      return { ...state, deletingRoomOrder: action.payload };
    case SET_CHANGING_ROOM:
      return { ...state, changingRoom: action.payload };
    case SET_CREATING_ROOM:
      return { ...state, creatingRoom: action.payload };
    case SET_ROOM_SUCCESS:
      return { ...state, roomSuccess: action.payload };
    case SET_ROOM_ERROR:
      return { ...state, roomError: action.payload };
    case SET_CHANGING_ROOM_SERVICE:
      return { ...state, changingRoomService: action.payload };
    case SET_CREATING_ROOM_SERVICE:
      return { ...state, creatingService: action.payload };
    case SET_SERVICE_SUCCESS:
      return { ...state, serviceSuccess: action.payload };
    case SET_SERVICE_ERROR:
      return { ...state, serviceError: action.payload };

    default:
      return state;
  }
};

export const setRoomTypeAction = (payload: object) => ({
  type: SET_ROOM_TYPE,
  payload,
});

export const setSelectRoomTypeAction = (payload: object) => ({
  type: SET_SELECT_ROOM_TYPE,
  payload,
});

export const setSelectRoomServiceAction = (payload: object) => ({
  type: SET_SELECT_ROOM_SERVICE,
  payload,
});

export const setAdultsAmountAction = (payload: number) => ({
  type: SET_ADULTS,
  payload,
});

export const setStartDateAction = (payload: string | null) => ({
  type: SET_START_DATE,
  payload,
});

export const setFinishDateAction = (payload: string | null) => ({
  type: SET_FINISH_DATE,
  payload,
});

export const setOrderPriceAction = (payload: number) => ({
  type: SET_ORDER_PRICE,
  payload,
});

export const setDeletingOrderRoomAction = (payload: number) => ({
  type: SET_DELETING_ORDER_ROOM,
  payload,
});

export const setChangingRoomAction = (payload: any) => ({
  type: SET_CHANGING_ROOM,
  payload,
});

export const setCreatingRoomAction = (payload: any) => ({
  type: SET_CREATING_ROOM,
  payload,
});

export const setRoomSuccessAction = (payload: any) => ({
  type: SET_ROOM_SUCCESS,
  payload,
});

export const setRoomErrorAction = (payload: any) => ({
  type: SET_ROOM_ERROR,
  payload,
});

export const setChangingRoomServiceAction = (payload: any) => ({
  type: SET_CHANGING_ROOM_SERVICE,
  payload,
});

export const setCreatingServiceAction = (payload: any) => ({
  type: SET_CREATING_ROOM_SERVICE,
  payload,
});

export const setServiceSuccessAction = (payload: any) => ({
  type: SET_SERVICE_SUCCESS,
  payload,
});

export const setServiceErrorAction = (payload: any) => ({
  type: SET_SERVICE_ERROR,
  payload,
});
