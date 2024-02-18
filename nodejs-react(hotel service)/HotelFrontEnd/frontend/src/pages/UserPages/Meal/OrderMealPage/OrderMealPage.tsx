import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import Flex from '../../../../components/primitives/flex/Flex';
import { StyleProps } from '../../../../styles/style.type';
import Container from '../../../../components/primitives/wrapper/Container';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetAllTablesLazyQuery,
  useGetBookTimesLazyQuery,
} from './orderMealPage.generated';
import {
  setAvailableBookTimes,
  setBookDateAction,
  setInRoomAction,
  setMealsAction,
  setSelectBookTime,
  setSelectTableAction,
  setTablesAction,
} from '../../../../redux/reducers/meal.reducer';
import Popup from '../../../../components/composites/Popup/Popup';
import { DateSingleInput, OnDateChangeProps } from '@datepicker-react/styled';
import { formatDate } from '../../../../utils/date.utils';
import Select from '../../../../components/primitives/select/Select';
import Submit from '../../../../components/primitives/submit/Submit';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';

const FlexContainer = styled('div')<StyleProps>((props) => ({
  display: props.display,
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',

  width: '279px',
  height: '350px',

  transition: '.2s',

  div: {
    width: '50px',
    height: '50px',
    marginLeft: '40px',

    ':nth-child(3n+1)': {
      marginLeft: 0,
    },

    button: {
      width: 'inherit',
      height: 'inherit',
      border: '1px solid #cacbd3',
      borderRadius: '10px',
      background: 'transparent',

      fontFamily: 'Montserrat',

      ':hover': {
        background: '#969de7',
        transition: '.2s',
      },

      ':active': {
        background: '#747bd7',
        transition: '.2s',
      },
    },
  },
}));

const flexContainerProps = {
  display: 'none',
};

const initialState = {
  date: null,
  showDatepicker: false,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, showDatepicker: action.payload };
    case 'dateChange':
      return action.payload;
    default:
      throw new Error();
  }
}

const OrderMealPage = () => {
  let navigate = useNavigate();
  const rootDispatch = useDispatch();
  let tables = useSelector((state: any) => state.meal.tables);
  const [getTables, { data, loading, error }] = useGetAllTablesLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const inRoom = useSelector((state: any) => state.meal.inRoom);
  const selectedTable = useSelector((state: any) => state.meal.selectedTable);
  const selectedMeals = useSelector((state: any) => state.meal.selectedMeals);
  const selectedDate = useSelector((state: any) => state.meal.bookDate);
  const selectedTime = useSelector((state: any) => state.meal.selectedBookTime);
  const availableBookTimes = useSelector(
    (state: any) => state.meal.availableBookTimes,
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [getBookTimes, props] = useGetBookTimesLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const selectBookTime = useSelector(
    (state: any) => state.meal.selectedBookTime,
  );

  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const handleOpenErrorPopup = () => {
    setIsErrorPopupOpen(true);
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (!data) {
      getTables();
    }
  }, []);

  useEffect(() => {
    if (data) {
      rootDispatch(setTablesAction(data.getAllTables));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [error]);

  useEffect(() => {
    if (props.error) {
      if (props.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [props.error]);

  useEffect(() => {
    if (props.data) {
      rootDispatch(setAvailableBookTimes(props.data.getBookTimes));
    }
  }, [props.data]);

  const checkSelectedItems = () => {
    if (selectedMeals.length == 0) {
      return true;
    }

    if (!inRoom) {
      if (!selectedTable || !selectedDate || !selectedTime) return true;
    }

    return false;
  };

  return (
    <Container>
      <Container>
        <Submit
          onClick={() => {
            navigate('/HotelFrontEnd/meal_menu');
          }}
        >
          Open menu
        </Submit>
      </Container>
      <Container padding={'0'}>
        <Flex>
          <Flex padding={'0'} alignItems={'center'}>
            <p>
              Select where you wil be eat:
              {inRoom
                ? 'room'
                : selectedTable
                ? selectedTable?.tableNumber
                : 'none'}
            </p>
          </Flex>

          <Container>
            <Submit
              disabled={!(inRoom || selectedTable)}
              onClick={() => {
                rootDispatch(setInRoomAction(false));
                rootDispatch(setSelectTableAction(null));
                flexContainerProps.display = 'none';
              }}
            >
              Delay
            </Submit>
          </Container>
        </Flex>
        <Flex>
          <Container>
            <Submit
              disabled={inRoom ^ selectedTable?.checked ? true : false}
              onClick={() => {
                rootDispatch(setInRoomAction(true));
              }}
            >
              In Room
            </Submit>
          </Container>

          <Container>
            <Submit
              disabled={inRoom ^ selectedTable?.checked ? true : false}
              onClick={() => {
                rootDispatch(setSelectTableAction({ checked: true }));
                flexContainerProps.display = 'flex';
              }}
            >
              Book Table
            </Submit>
          </Container>
        </Flex>
      </Container>

      <Flex>
        <FlexContainer {...flexContainerProps}>
          {tables &&
            tables.map((item: any) => {
              return (
                <div>
                  <button
                    onClick={() => {
                      rootDispatch(
                        setSelectTableAction({ ...item, checked: true }),
                      );

                      handleOpenPopup();
                    }}
                  >
                    {item.tableNumber}
                  </button>
                </div>
              );
            })}
        </FlexContainer>
      </Flex>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        margin={'-350px 0 0 0 '}
      >
        <DateSingleInput
          onDateChange={(data: OnDateChangeProps) => {
            dispatch({ type: 'dateChange', payload: data });
            getBookTimes({
              variables: {
                tableNumber: selectedTable.tableNumber,
                bookDate: formatDate(data.date),
              },
            });

            rootDispatch(setBookDateAction(formatDate(data.date)));
          }}
          onFocusChange={(focusedInput) =>
            dispatch({ type: 'focusChange', payload: focusedInput })
          }
          date={state.date} // Date or null
          showDatepicker={state.showDatepicker} // Boolean
          minBookingDate={new Date(Date.now())}
          displayFormat={'dd/MM/yyyy'}
        />

        {availableBookTimes.length ? (
          <Select
            value={selectBookTime}
            onChange={(value) => {
              rootDispatch(setSelectBookTime(value));
            }}
            options={availableBookTimes.map((item: any, index: any) => {
              if (!selectedTime && index === 0) {
                rootDispatch(setSelectBookTime(item.key));
              }
              return { value: item.key, label: item.key };
            })}
          />
        ) : (
          <Container>no times</Container>
        )}

        <Container backgroundColor={'transparent'}>
          <Submit
            onClick={() => {
              rootDispatch(setAvailableBookTimes([]));
              handleClosePopup();
            }}
          >
            Ok
          </Submit>
        </Container>
      </Popup>

      <Container>
        <Submit
          disabled={checkSelectedItems()}
          onClick={() => {
            flexContainerProps.display = 'none';
            navigate('/HotelFrontEnd/confirm_meal_order');
          }}
        >
          Confirm
        </Submit>
      </Container>

      <Popup
        isOpen={IsErrorPopupOpen}
        onClose={handleCloseErrorPopup}
        zIndex={'99'}
      >
        <ErrorLine backgroundColor={'transparent'}>
          {error && error.message}
        </ErrorLine>
        <Container>
          <Submit onClick={() => handleCloseErrorPopup()}>Ok</Submit>
        </Container>
      </Popup>
    </Container>
  );
};

export default OrderMealPage;
