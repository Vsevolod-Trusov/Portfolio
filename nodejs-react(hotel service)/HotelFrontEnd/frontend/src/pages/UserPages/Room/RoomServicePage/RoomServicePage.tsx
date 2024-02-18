import React, { useEffect, useState } from 'react';
import { useGetRoomServicesQuery } from './roomServicePage.generated';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  setOrderPriceAction,
  setSelectRoomServiceAction,
} from '../../../../redux/reducers/room.reducer';
import Form from '../../../../components/primitives/form/Form';
import Container from '../../../../components/primitives/wrapper/Container';
import Flex from '../../../../components/primitives/flex/Flex';
import Submit from '../../../../components/primitives/submit/Submit';
import Popup from '../../../../components/composites/Popup/Popup';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';

const RoomServicePage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useGetRoomServicesQuery({
    fetchPolicy: 'no-cache',
  });
  const dispatch = useDispatch();
  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const orderPrice = useSelector((state: any) => state.room.orderPrice);
  const selectedRoomType = useSelector(
    (state: any) => state.room.selectedRoomType,
  );
  const selectedServices = useSelector(
    (state: any) => state.room.selectedRoomServices,
  );

  if (Object.keys(selectedRoomType).length === 0) {
    return <Navigate to={'/HotelFrontEnd/search_room'} />;
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
      <Form maxWidth={'50%'} margin={'0 auto'}>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          alignSelf={'center'}
        >
          <Container>
            <Container padding={'0.5rem'}>
              Room Type: {selectedRoomType.type}
            </Container>
            <Container padding={'0.5rem'}>
              Base Price: {selectedRoomType.basePrice}
            </Container>
          </Container>
          <Container padding={'1rem'} maxWidth={'90%'}>
            {data &&
              data.getAllRoomServices.map((item: any, index: any) => {
                return (
                  <div key={uuidv4()}>
                    <Flex justifyContent={'space-evenly'}>
                      <div>{item.serviceName}</div>
                      <div>{item.servicePrice}</div>
                    </Flex>

                    <Flex justifyContent={'space-evenly'} minWidth={'30vw'}>
                      <Submit
                        minWidth={'30%'}
                        name={'select button'}
                        disabled={selectedServices.find(
                          (service: any) =>
                            service.serviceName === item.serviceName,
                        )}
                        onClick={() => {
                          dispatch(
                            setOrderPriceAction(orderPrice + item.servicePrice),
                          );
                          dispatch(
                            setSelectRoomServiceAction([
                              ...selectedServices,
                              item,
                            ]),
                          );
                        }}
                      >
                        Add
                      </Submit>

                      <Submit
                        minWidth={'30%'}
                        name={'select button'}
                        disabled={
                          !selectedServices.find(
                            (service: any) =>
                              service.serviceName === item.serviceName,
                          )
                        }
                        onClick={() => {
                          dispatch(
                            setOrderPriceAction(orderPrice - item.servicePrice),
                          );
                          dispatch(
                            setSelectRoomServiceAction([
                              ...selectedServices.filter(
                                (service: any) =>
                                  service.serviceName !== item.serviceName,
                              ),
                            ]),
                          );
                        }}
                      >
                        Delay
                      </Submit>
                    </Flex>
                  </div>
                );
              })}
          </Container>
          <Flex justifyContent={'space-evenly'} minWidth={'30vw'}>
            <Submit
              onClick={() => {
                navigate('/HotelFrontEnd/search_room/');
              }}
            >
              Back
            </Submit>

            <Submit
              onClick={() => {
                navigate('/HotelFrontEnd/room_order/');
              }}
            >
              Next
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

export default RoomServicePage;
