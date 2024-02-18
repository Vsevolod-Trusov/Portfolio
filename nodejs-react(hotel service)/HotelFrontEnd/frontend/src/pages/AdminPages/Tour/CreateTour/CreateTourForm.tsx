import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useReducer,
} from 'react';
import Form from '../../../../components/primitives/form/Form';
import Container from '../../../../components/primitives/wrapper/Container';
import Submit from '../../../../components/primitives/submit/Submit';
import Flex from '../../../../components/primitives/flex/Flex';
import { inputProps } from '../../../../components/primitives/input/SignInLogin';
import Input from '../../../../components/primitives/input/generic-input/Input';
import { DateRangeInput } from '@datepicker-react/styled';
import Title from '../../../../components/primitives/title/Title';
import { StyleProps } from '../../../../styles/style.type';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  setAdminCreatingTourAction,
  setAdminErrorAction,
  setAdminSuccessAction,
} from '../../../../redux/reducers/tour.reducer';
import { formatDate } from '../../../../utils/date.utils';
import { AnyAction } from 'redux';
import { checkDates, checkPrice } from '../../../../utils/form.cheks.utils';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import SuccessLine from '../../../../components/primitives/successLine/SuccessLine';
import { useCreateTourMutation } from './data/createTour.generated';
import TextArea from '../../../../components/primitives/textarea/TextArea';
import { IForm } from '../../interfaces';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

const FLEX_VALUE = '0.31';
const FLEX_INPUT_VALUE = '0.65';

const flexWrapProps: StyleProps = {
  justifyContent: 'space-between',
  minWidth: '90%',
  margin: '1rem auto',
};

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

interface ICheckAndSendProps {
  title: string;
  description: string;
  price: string;
  start: string;
  end: string;
  dispatch: Dispatch<AnyAction>;
  graphql: any;
}

const checkAndSend = ({
  title,
  description,
  price,
  start,
  end,
  dispatch,
  graphql,
}: ICheckAndSendProps) => {
  if (!title) {
    dispatch(setAdminErrorAction('Fill in title'));
    return;
  }

  if (!description) {
    dispatch(setAdminErrorAction('Fill in description'));
    return;
  }

  if (!checkPrice(price)) {
    dispatch(setAdminErrorAction('Invalid price value'));
    return;
  }

  if (!checkDates(start, end)) {
    dispatch(setAdminErrorAction('Invalid dates'));
    return;
  }

  graphql({
    variables: {
      tour: {
        tourName: title,
        startDate: start,
        endDate: end,
        description: description,
        tourPrice: +price,
      },
    },
  });
};

const CreateTourForm = (props: PropsWithChildren<IForm>) => {
  const navigate = useNavigate();
  const rootDispatch = useDispatch();
  const creatingTour = useSelector((state: any) => state.tour.adminCreatedTour);
  const successMessage = useSelector(
    (state: any) => state.tour.adminSuccessMessage,
  );
  const errorMessage = useSelector(
    (state: any) => state.tour.adminErrorMessage,
  );

  const [createTour, { data, error, loading }] = useCreateTourMutation();

  let { adminTourPrice, adminTourName, adminTourDescription } = creatingTour;

  const initialState = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      rootDispatch(setAdminSuccessAction('Created'));
      rootDispatch(
        setAdminCreatingTourAction({
          adminTourStart: null,
          adminTourEnd: null,
          adminTourPrice: '',
          adminTourName: '',
          adminTourDescription: '',
        }),
      );
      dispatch({
        type: 'DATE_CHANGE',
        payload: {
          startDate: null,
          endDate: null,
          focusedInput: null,
        },
      });
    }
  }, [
    rootDispatch,
    dispatch,
    data,
    setAdminCreatingTourAction,
    setAdminSuccessAction,
  ]);

  return (
    <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
      <Flex flexDirection={'column'} alignItems={'center'} minWidth={'100%'}>
        <Title>Tour Creating</Title>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Title:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE}>
            <Container textAlign={'center'}>
              <Input
                {...inputProps}
                minWidth={'50%'}
                name={'tourTitle'}
                value={adminTourName}
                onChange={(e) =>
                  rootDispatch(
                    setAdminCreatingTourAction({
                      ...creatingTour,
                      adminTourName: e.target.value,
                    }),
                  )
                }
              />
            </Container>
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Price:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE}>
            <Container textAlign={'center'}>
              <Input
                {...inputProps}
                minWidth={'50%'}
                name={'tourPrice'}
                value={adminTourPrice}
                onChange={(e) =>
                  rootDispatch(
                    setAdminCreatingTourAction({
                      ...creatingTour,
                      adminTourPrice: e.target.value,
                    }),
                  )
                }
              />
            </Container>
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <Container flex={'0.64'} alignSelf={'center'}>
            <Flex>Date:</Flex>
          </Container>
          <Container flex={FLEX_VALUE}>
            <DateRangeInput
              onDatesChange={(data) => {
                dispatch({ type: 'DATE_CHANGE', payload: data });
                rootDispatch(
                  setAdminCreatingTourAction({
                    ...creatingTour,
                    adminTourStart: formatDate(data.startDate),
                    adminTourEnd: formatDate(data.endDate),
                  }),
                );
              }}
              onFocusChange={(focusedInput) =>
                dispatch({
                  type: 'focusChange',
                  payload: focusedInput,
                })
              }
              startDate={state.startDate} // Date or null
              endDate={state.endDate} // Date or null
              focusedInput={state.focusedInput} // START_DATE, END_DATE or null
              minBookingDate={new Date(Date.now())}
              vertical={window.innerWidth <= 767}
              displayFormat={'dd/MM/yyyy'}
            />
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <TextArea
            name={'tourDescription'}
            value={adminTourDescription}
            resize={'none'}
            onChange={(e) =>
              rootDispatch(
                setAdminCreatingTourAction({
                  ...creatingTour,
                  adminTourDescription: e.target.value,
                }),
              )
            }
          />
        </Flex>

        <Flex
          justifyContent={'space-between'}
          minWidth={'80%'}
          margin={'0.4rem 0 0 0'}
        >
          <Container flex={'0.4'}>
            <Submit onClick={() => props.changeTab && props.changeTab('1')}>
              Back
            </Submit>
          </Container>

          <Container flex={'0.4'}>
            <Submit
              onClick={() =>
                checkAndSend({
                  title: creatingTour.adminTourName,
                  description: creatingTour.adminTourDescription,
                  price: creatingTour.adminTourPrice,
                  start: creatingTour.adminTourStart,
                  end: creatingTour.adminTourEnd,
                  dispatch: rootDispatch,
                  graphql: createTour,
                })
              }
              onBlur={() => {
                if (successMessage) rootDispatch(setAdminSuccessAction(''));

                if (errorMessage) rootDispatch(setAdminErrorAction(''));
              }}
            >
              Create Tour
            </Submit>
          </Container>
        </Flex>
        <Container>
          {errorMessage ? (
            <ErrorLine>{errorMessage}</ErrorLine>
          ) : (
            <SuccessLine visibility={successMessage ? 'visible' : 'hidden'}>
              {successMessage ? successMessage : 'Mock'}
            </SuccessLine>
          )}
        </Container>
      </Flex>
    </Form>
  );
};

export default CreateTourForm;
