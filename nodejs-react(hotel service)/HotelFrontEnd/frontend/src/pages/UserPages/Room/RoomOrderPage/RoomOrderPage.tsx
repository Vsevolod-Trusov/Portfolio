import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  setAdultsAmountAction,
  setFinishDateAction,
  setOrderPriceAction,
  setRoomTypeAction,
  setSelectRoomServiceAction,
  setSelectRoomTypeAction,
  setStartDateAction,
} from '../../../../redux/reducers/room.reducer';
import { v4 as uuidv4 } from 'uuid';
import Container from '../../../../components/primitives/wrapper/Container';
import Form from '../../../../components/primitives/form/Form';
import Flex from '../../../../components/primitives/flex/Flex';
import Submit from '../../../../components/primitives/submit/Submit';
import Popup from '../../../../components/composites/Popup/Popup';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';

const SEND_MUTATION = gql`
  mutation createOrderRoom($createOrderRoom: OrderRoomInput!, $token: String!) {
    createOrderRoom(createOrderRoom: $createOrderRoom, token: $token) {
      _id
      roomNumber
      peopleAmount
      checkInDate
      exitDate
      roomServices
      roomType
      orderPrice
      userLogin
    }
  }
`;

const RoomOrderPage = () => {
  const navigate = useNavigate();
  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const selectedRoomType = useSelector(
    (state: any) => state.room.selectedRoomType,
  );
  const selectedServices = useSelector(
    (state: any) => state.room.selectedRoomServices,
  );

  const order = useSelector((state: any) => state.room);
  const totalCost = useSelector((state: any) => state.room.orderPrice);
  const [sendRequest, { data, error, loading }] = useMutation(SEND_MUTATION, {
    fetchPolicy: 'no-cache',
  });
  const dispatch = useDispatch();

  if (Object.keys(selectedRoomType).length === 0) {
    return <Navigate to={'/HotelFrontEnd/search_room'} />;
  }

  if (data) {
    dispatch(setOrderPriceAction(0.0));
    dispatch(setSelectRoomServiceAction([]));
    dispatch(setSelectRoomTypeAction({}));
    dispatch(setRoomTypeAction([]));
    dispatch(setAdultsAmountAction(1));
    dispatch(setStartDateAction(null));
    dispatch(setFinishDateAction(null));
    navigate('/HotelFrontEnd/');
  }

  const handleOpenErrorPopup = () => {
    setIsErrorPopupOpen(true);
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [error]);

  return (
    <Container padding={'1rem'}>
      <Form display={'flex'} maxWidth={'50%'} margin={'0 auto'}>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          alignSelf={'center'}
          minWidth={'90%'}
        >
          <Container padding={'0.8rem'}>
            <Container>Room:</Container>
            <Container>Type: {selectedRoomType.type}</Container>
            <Container>Base Price: {selectedRoomType.basePrice}$</Container>
          </Container>

          <Container>Services:</Container>
          <Container>
            {selectedServices.map((item: any) => {
              return (
                <Flex
                  key={uuidv4()}
                  margin={'0.5rem 0'}
                  justifyContent={'start'}
                >
                  <Container key={uuidv4()}> {item.serviceName}:</Container>
                  <Container key={uuidv4()}> {item.servicePrice}$</Container>
                </Flex>
              );
            })}
          </Container>

          <Container>Summary: {totalCost}$</Container>
          <Flex minWidth={'20vw'} justifyContent={'space-evenly'}>
            <Submit
              onClick={() => {
                navigate('/HotelFrontEnd/room_service/');
              }}
            >
              Back
            </Submit>

            <Submit
              onClick={() => {
                sendRequest({
                  variables: {
                    createOrderRoom: {
                      roomType: selectedRoomType.type,
                      peopleAmount: order.adultsAmount,
                      checkInDate: order.startDate,
                      exitDate: order.finishDate,
                      orderPrice: order.orderPrice,
                      roomServices: order.selectedRoomServices.map(
                        (item: any) => {
                          return item.serviceName;
                        },
                      ),
                    },
                    token: window.sessionStorage.getItem('token') || '',
                  },
                });
              }}
            >
              Confirm
            </Submit>
          </Flex>
        </Flex>
      </Form>

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

export default RoomOrderPage;
