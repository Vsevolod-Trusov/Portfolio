import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../../components/primitives/wrapper/Container';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  setSelectTourAction,
  setTourAdultsAmountAction,
  setTourDateAction,
} from '../../../../redux/reducers/tour.reducer';
import { useOrderTourMutation } from './confirmTourOrder.generated';
import Popup from '../../../../components/composites/Popup/Popup';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import Submit from '../../../../components/primitives/submit/Submit';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import Flex from '../../../../components/primitives/flex/Flex';
import Form from '../../../../components/primitives/form/Form';

const ConfirmTourOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const selectedTour = useSelector((state: any) => state.tour.selectedTour);
  const selectedTourDate = useSelector((state: any) => state.tour.tourDate);
  const adultsAmount = useSelector((state: any) => state.tour.tourAdultsAmount);

  const [orderTour, { data, error, loading }] = useOrderTourMutation();
  const tourOrderPrice = selectedTour.tourPrice * adultsAmount;

  if (data) {
    dispatch(setSelectTourAction({}));
    dispatch(setTourDateAction(''));
    dispatch(setTourAdultsAmountAction(1));
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

  if (Object.keys(selectedTour).length === 0 || !selectedTourDate) {
    return <Navigate to='/HotelFrontEnd/order_tour' />;
  }

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
          <Container padding={'0'}>
            <div>Selected Tour: {selectedTour.tourName}</div>
            <div>Adults Amount: {adultsAmount}</div>
            <div>Tour Date: {selectedTourDate}</div>
          </Container>
          <Container padding={'0'}>
            <div>Order Price: {tourOrderPrice}$</div>
          </Container>
          <Container>
            <Submit
              onClick={() =>
                orderTour({
                  variables: {
                    order: {
                      tourName: selectedTour.tourName,
                      peopleAmount: adultsAmount,
                      orderPrice: tourOrderPrice,
                      tourDate: selectedTourDate,
                    },
                    token: window.sessionStorage.getItem('token') || '',
                  },
                })
              }
            >
              Send Order
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

export default ConfirmTourOrder;
