import React, { useEffect, useState } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useOrderMealMutation } from './confirmMealOrder.generated';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  setBookDateAction,
  setInRoomAction,
  setSelectBookTime,
  setSelectMealAction,
  setSelectMealsAction,
  setSelectTableAction,
} from '../../../../redux/reducers/meal.reducer';
import { formatDate } from '../../../../utils/date.utils';
import Form from '../../../../components/primitives/form/Form';
import Flex from '../../../../components/primitives/flex/Flex';
import Submit from '../../../../components/primitives/submit/Submit';
import Popup from '../../../../components/composites/Popup/Popup';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';

function sendRequest(
  sendData: any,
  selectedMeals: [],
  orderPrice: number,
  inRoom: boolean,
  selectedTable: any,
  selectedDate: string,
  selectedTime: string,
  token: string,
) {
  const order = {
    order: {
      mealsAmount: selectedMeals.map((meal: any) => meal.amount),
      orderPrice: orderPrice,
      inRoom: inRoom,
      bookDate: formatDate(Date.now()),
      meals: selectedMeals.map((meal: any) => meal.key),
    },
  };

  let variables = {};

  if (inRoom) {
    variables = { ...order, token: token };
  } else {
    variables = {
      order: {
        ...order.order,
        tableNumber: selectedTable.tableNumber,
        bookDate: selectedDate,
        bookTime: selectedTime,
      },
      token: token,
    };
  }

  sendData({
    variables: { ...variables },
  });
}

const ConfirmMealOrder = () => {
  const navigate = useNavigate();
  const selectedMeals = useSelector((state: any) => state.meal.selectedMeals);
  const inRoom = useSelector((state: any) => state.meal.inRoom);
  const selectedTable = useSelector((state: any) => state.meal.selectedTable);
  const selectedDate = useSelector((state: any) => state.meal.bookDate);
  const selectedTime = useSelector((state: any) => state.meal.selectedBookTime);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();

  if (selectedMeals.length == 0) {
    return <Navigate to={'/HotelFrontEnd/meal_order'} />;
  }

  if (!inRoom) {
    if (!selectedTable || !selectedDate || !selectedTime)
      return <Navigate to={'/HotelFrontEnd/meal_order'} />;
  }

  const orderMeal = selectedMeals.reduce((total: number, current: any) => {
    total += current.basePrice * current.amount;
    return total;
  }, 0);

  const orderPrice = orderMeal + (inRoom ? 5 : 0);

  const [sendData, { data, error, loading }] = useOrderMealMutation();

  if (data) {
    dispatch(setSelectMealsAction([]));
    dispatch(setSelectMealAction({}));
    dispatch(setSelectTableAction(null));
    dispatch(setSelectBookTime(''));
    dispatch(setBookDateAction(''));
    dispatch(setInRoomAction(false));
    navigate('/HotelFrontEnd/');
  }

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenPopup();
      }
    }
  }, [error]);

  return (
    <Container padding={'1rem'}>
      <Form maxWidth={'45%'} margin={'0 auto'}>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          alignSelf={'center'}
          minWidth={'90%'}
        >
          <Container padding={'0'}>
            <Container padding={'0'}>Meals:</Container>
            {selectedMeals.map((item: any) => {
              return (
                <Container padding={'0'} margin={'0.8rem 0 0 0'}>
                  <Container>Name: {item.key}</Container>
                  <Container>Amount: {item.amount}</Container>
                  <Container margin={'0.2rem 0'}>
                    Price: {item.basePrice}$
                  </Container>
                </Container>
              );
            })}

            {inRoom ? (
              <Container padding={'0'} margin={'0.8rem 0 0 0'}>
                <Container padding={'0'}>Will be eat in Room</Container>
                <Container padding={'0'}>
                  Date: {formatDate(Date.now())}
                </Container>
              </Container>
            ) : (
              <Container padding={'0'} margin={'0.8rem 0 0 0'}>
                <Container padding={'0'}>Book Table:</Container>
                <Container padding={'0'}>
                  <Container>Table №{selectedTable.tableNumber}</Container>
                  <Container>Date: {selectedDate}</Container>
                  <Container>Time: {selectedTime}</Container>
                </Container>
              </Container>
            )}

            <Container margin={'1rem 0 0 0'}>Summary: {orderPrice}$</Container>
          </Container>

          <Container>
            {' '}
            <Submit
              onClick={() => {
                navigate('/HotelFrontEnd/meal_order');
              }}
            >
              Back
            </Submit>
            <Submit
              onClick={() => {
                sendRequest(
                  sendData,
                  selectedMeals,
                  orderPrice,
                  inRoom,
                  selectedTable,
                  selectedDate,
                  selectedTime,
                  window.sessionStorage.getItem('token') || '',
                );
              }}
            >
              Confirm
            </Submit>
          </Container>
        </Flex>
      </Form>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} zIndex={'99'}>
        <ErrorLine backgroundColor={'transparent'}>
          {error && error.message}
        </ErrorLine>
        <Container>
          <Submit onClick={() => handleClosePopup()}>Ok</Submit>
        </Container>
      </Popup>
    </Container>
  );
};

export default ConfirmMealOrder;
