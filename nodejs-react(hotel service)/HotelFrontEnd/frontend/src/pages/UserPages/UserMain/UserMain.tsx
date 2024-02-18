import React, { useEffect, useReducer, useState } from 'react';
import Container from '../../../components/primitives/wrapper/Container';
import Burger from '../../../components/composites/BurgerMenu/Burger';
import Menu from '../../../components/composites/BurgerMenu/Menu';
import ContainerWithMediaHeader from '../../../components/primitives/wrapper/ContainerWithMediaHeader';
import FlexWithMediaHeader from '../../../components/primitives/flex/FlexWithMediaHeader';
import Image from '../../../components/primitives/image/Image';
import MainImage from '../../../images/main.png';
import ContainerImageTablet from '../../../components/primitives/wrapper/ContainerImageTablet';
import RootImage from '../../../images/root.webp';
import Flex from '../../../components/primitives/flex/Flex';
import LobbyMan from '../../../images/Lobby.png';
import TitleWithMediaMain from '../../../components/primitives/title/TitleWithMediaMain';
import { DateRangeInput } from '@datepicker-react/styled';
import {
  setAdultsAmountAction,
  setFinishDateAction,
  setRoomTypeAction,
  setStartDateAction,
} from '../../../redux/reducers/room.reducer';
import Submit from '../../../components/primitives/submit/Submit';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useLazyQuery } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/date.utils';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';
import Popup from '../../../components/composites/Popup/Popup';
import ErrorLine from '../../../components/primitives/errorLine/ErrorLine';

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload };
    case 'DATE_CHANGE':
      return action.payload;
    default:
      throw new Error();
  }
}
//DatePicker

function sendRequest(
  checkInDate: any,
  exitDate: any,
  adultsAmount: string,
  sendSearchQuery: any,
  rootDispatch: any,
) {
  const startDate = formatDate(`${checkInDate}`);
  const finishDate = formatDate(`${exitDate}`);

  rootDispatch(setStartDateAction(startDate));
  rootDispatch(setFinishDateAction(finishDate));

  sendSearchQuery({
    variables: {
      startDate: startDate,
      finishDate: finishDate,
      adultsAmount: `${adultsAmount}`,
    },
  });
}

const imageProps = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: '0',
  left: '0',
};

const SEARCH_ROOM_QUERY = gql`
  query getRoomsToBook(
    $startDate: String!
    $finishDate: String!
    $adultsAmount: String!
  ) {
    getRoomTypesToBook(
      startDate: $startDate
      finishDate: $finishDate
      adultsAmount: $adultsAmount
    ) {
      type
      basePrice
    }
  }
`;

const UserMain = () => {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem('token');
  const [open, setOpen] = useState(false);
  const rootDispatch = useDispatch();
  const adultsAmount = useSelector((state: any) => state.room.adultsAmount);
  const startDate = useSelector((state: any) => state.room.startDate);
  const finishDate = useSelector((state: any) => state.room.finishDate);
  const [errorText, setErrorText] = useState<string>('');

  //DatePicker
  const initialState = {
    startDate: startDate ? new Date(startDate) : null,
    endDate: finishDate ? new Date(finishDate) : null,
    focusedInput: null,
  };

  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  //DatePicker
  const [state, dispatch] = useReducer(reducer, initialState);
  //DatePicker
  const [sendSearchQuery, { data, loading, error }] = useLazyQuery(
    SEARCH_ROOM_QUERY,
    {
      fetchPolicy: 'no-cache',
    },
  );

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
  useEffect(() => {
    if (data) {
      if (data?.getRoomTypesToBook.length) {
        rootDispatch(setRoomTypeAction(data.getRoomTypesToBook));
        navigate('/HotelFrontEnd/search_room');
      } else {
        setErrorText('No available suites');
        handleOpenErrorPopup();
      }
    }
  }, [data]);

  return (
    <Container padding={'0'}>
      <Container name={'header'} padding={'0'}>
        <Container width={'100%'} padding={'0'}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
          <ContainerWithMediaHeader
            padding={'0'}
            height={'30vw'}
            width={'100%'}
          >
            <FlexWithMediaHeader
              justifyContent={'center'}
              position={'relative'}
              alignItems={'center'}
              flex={'0.5'}
              height={'100%'}
              width={'100%'}
            >
              <FlexWithMediaHeader
                flex={'0.5'}
                fontFamily={'Montserrat-Thin'}
                fontWeight={'600'}
              >
                <div>
                  <div>De</div>
                  <div>L'Europe</div>
                </div>
              </FlexWithMediaHeader>
              <Container
                position={'relative'}
                padding={'0'}
                flex={'0.5'}
                width={'100%'}
                height={'100%'}
              >
                <Image src={MainImage} alt={'#'} {...imageProps} />
              </Container>
            </FlexWithMediaHeader>
          </ContainerWithMediaHeader>
        </Container>
      </Container>

      <Container
        name={'main'}
        width={'100%'}
        height={'60vh'}
        padding={'0 25px'}
      >
        <ContainerImageTablet
          position={'relative'}
          padding={'0'}
          flex={'0.5'}
          height={'60vh'}
        >
          <Image src={RootImage} alt={'#'} {...imageProps} />
        </ContainerImageTablet>

        <Flex>
          <Container padding={'0'} width={'100%'}>
            <Flex justifyContent={'space-evenly'} minWidth={'90%'}>
              <ContainerWithMediaHeader
                position={'relative'}
                padding={'0'}
                flex={'0.5'}
                height={'40vh'}
              >
                <Image src={LobbyMan} alt={'#'} {...imageProps} />
              </ContainerWithMediaHeader>

              <Flex padding={'0'} width={'30vw'} alignItems={'center'}>
                <TitleWithMediaMain fontSize={'1rem'}>
                  WELCOME TO DE L’EUROPE AMSTERDAM, HOME TO THE LOVER OF THE
                  TRUE AND BEAUTIFUL.
                </TitleWithMediaMain>
              </Flex>
            </Flex>

            <Container padding={'0'}>
              <Flex
                justifyContent={'space-evenly'}
                minWidth={'100%'}
                margin={'10px 0 0 0 '}
              >
                <DateRangeInput
                  onDatesChange={(data) =>
                    dispatch({ type: 'DATE_CHANGE', payload: data })
                  }
                  onFocusChange={(focusedInput) =>
                    dispatch({ type: 'focusChange', payload: focusedInput })
                  }
                  startDate={state.startDate} // Date or null
                  endDate={state.endDate} // Date or null
                  focusedInput={state.focusedInput} // START_DATE, END_DATE or null
                  minBookingDate={new Date(Date.now())}
                  vertical={window.innerWidth <= 767}
                  displayFormat={'dd/MM/yyyy'}
                />

                <input
                  type={'number'}
                  name={'adults'}
                  value={adultsAmount}
                  onChange={(e) => {
                    rootDispatch(setAdultsAmountAction(+e.target.value));
                  }}
                  min={'1'}
                  max={'4'}
                  style={{ width: '10%', height: '48px' }}
                />
              </Flex>
              <Submit
                disabled={!state.startDate || !state.endDate}
                onClick={() => {
                  if (!token) {
                    navigate('/HotelFrontEnd/signIn');
                    return;
                  }

                  if (state.startDate && state.endDate && adultsAmount) {
                    sendRequest(
                      state.startDate,
                      state.endDate,
                      adultsAmount,
                      sendSearchQuery,
                      rootDispatch,
                    );
                  }
                }}
              >
                Check Availability
              </Submit>
            </Container>
          </Container>
        </Flex>
      </Container>

      <Popup
        isOpen={IsErrorPopupOpen}
        onClose={handleCloseErrorPopup}
        zIndex={'99'}
      >
        <ErrorLine backgroundColor={'transparent'}>
          {(error && error.message) || (errorText && errorText)}
        </ErrorLine>
        <Container>
          <Submit onClick={() => handleCloseErrorPopup()}>Ok</Submit>
        </Container>
      </Popup>
    </Container>
  );
};

export default UserMain;
