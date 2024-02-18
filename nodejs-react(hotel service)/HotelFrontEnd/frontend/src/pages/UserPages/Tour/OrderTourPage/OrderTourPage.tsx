import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../../../components/primitives/wrapper/Container';
import { DateSingleInput, OnDateChangeProps } from '@datepicker-react/styled';
import { formatDate } from '../../../../utils/date.utils';
import { setBookDateAction } from '../../../../redux/reducers/meal.reducer';
import Flex from '../../../../components/primitives/flex/Flex';
import { Navigate, useNavigate } from 'react-router-dom';
import { setAdultsAmountAction } from '../../../../redux/reducers/room.reducer';
import {
  setTourAdultsAmountAction,
  setTourDateAction,
} from '../../../../redux/reducers/tour.reducer';
import Submit from '../../../../components/primitives/submit/Submit';
import { inputProps } from '../../../../components/primitives/input/SignInLogin';
import Input from '../../../../components/primitives/input/generic-input/Input';

export const initialState = {
  date: null,
  showDatepicker: false,
};

export function reducer(state: any, action: any) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, showDatepicker: action.payload };
    case 'dateChange':
      return action.payload;
    default:
      throw new Error();
  }
}

const OrderTourPage = () => {
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const selectedTour = useSelector((state: any) => state.tour.selectedTour);
  const selectedDate = useSelector((state: any) => state.tour.tourDate);
  const adultsAmount = useSelector((state: any) => state.tour.tourAdultsAmount);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Container name={'container'}>
      <Flex>
        <Container>
          <Submit
            onClick={() => {
              navigate('/HotelFrontEnd/tour_menu');
            }}
          >
            Open Tours
          </Submit>
        </Container>
      </Flex>
      <Container>
        <Flex margin={'1rem'}>{selectedTour && selectedTour.tourName}</Flex>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          display={Object.keys(selectedTour).length !== 0 ? 'flex' : 'none'}
        >
          <Container padding={'0'}>
            <DateSingleInput
              onDateChange={(data: OnDateChangeProps) => {
                dispatch({ type: 'dateChange', payload: data });
                rootDispatch(setTourDateAction(formatDate(data.date)));
              }}
              onFocusChange={(focusedInput) =>
                dispatch({ type: 'focusChange', payload: focusedInput })
              }
              date={state.date} // Date or null
              showDatepicker={state.showDatepicker} // Boolean
              minBookingDate={
                new Date(selectedTour.startDate).getTime() >
                new Date(Date.now()).getTime()
                  ? new Date(selectedTour.startDate)
                  : new Date(Date.now())
              }
              maxBookingDate={new Date(selectedTour.endDate)}
              displayFormat={'dd/MM/yyyy'}
            />
          </Container>

          <Flex padding={'0'}>
            <Input
              {...inputProps}
              type={'number'}
              name={'adults'}
              value={adultsAmount}
              onChange={(e) => {
                rootDispatch(setTourAdultsAmountAction(+e.target.value));
              }}
              min={'1'}
              max={'10'}
            />
          </Flex>
        </Flex>
      </Container>

      <Flex>
        <Container>
          <Submit
            onClick={() => navigate('/HotelFrontEnd/confirm_tour_order')}
            disabled={Object.keys(selectedTour).length === 0 || !selectedDate}
          >
            Confirm order
          </Submit>
        </Container>
      </Flex>
    </Container>
  );
};

export default OrderTourPage;
