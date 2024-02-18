import React, { PropsWithChildren, useEffect } from 'react';
import Form from '../../../../components/primitives/form/Form';
import Flex from '../../../../components/primitives/flex/Flex';
import Title from '../../../../components/primitives/title/Title';
import Container from '../../../../components/primitives/wrapper/Container';
import Input from '../../../../components/primitives/input/generic-input/Input';
import { inputProps } from '../../../../components/primitives/input/SignInLogin';
import Submit from '../../../../components/primitives/submit/Submit';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import SuccessLine from '../../../../components/primitives/successLine/SuccessLine';
import { ICreateRoomForm } from './interfaces';
import { initialCreatingRoomState } from '../../../../redux/reducers/room.reducer';
import Select from '../../../../components/primitives/select/Select';
import { AMOUNT_BED_OPTIONS } from '../../../../components/composites/ChangeForm/ChangeRoomForm/ChangeRoomForm';
import {
  FLEX_INPUT_VALUE,
  FLEX_VALUE,
  flexWrapProps,
} from '../../../../components/composites/CreateForm/CreateForm';

export const ROOM_TYPE_OPTIONS = [
  {
    label: 'suite',
    value: 'suite',
  },

  {
    label: 'standard',
    value: 'standard',
  },

  {
    label: 'deluxe',
    value: 'deluxe',
  },
];

const CreateRoomForm = ({
  dispatch,
  graphql,
  setAction,
  checkAndSend,
  creatingEntity,
  changeTab,
  successMessage,
  errorMessage,
  mockButton,
  isLoading,
  data,
  title,
  setEntitySuccessAction,
  setEntityErrorAction,
}: PropsWithChildren<ICreateRoomForm>) => {
  useEffect(() => {
    if (data) {
      dispatch(setEntitySuccessAction('Created'));
      dispatch(setAction(initialCreatingRoomState));
    }
  }, [data, setAction]);

  let { roomNumber, roomType } = creatingEntity;
  let { basePrice, amountBed, type } = roomType;

  return (
    <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
      <Flex flexDirection={'column'} alignItems={'center'} minWidth={'100%'}>
        <Title>{title}</Title>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Room Number:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE}>
            <Container textAlign={'center'}>
              <Input
                {...inputProps}
                minWidth={'50%'}
                name={'name'}
                value={roomNumber}
                onChange={(e) =>
                  dispatch(
                    setAction({
                      ...creatingEntity,
                      roomNumber: e.target.value,
                    }),
                  )
                }
              />
            </Container>
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Room Type:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE} textAlign={'center'}>
            <Select
              value={type}
              onChange={(value) => {
                dispatch(
                  setAction({
                    ...creatingEntity,
                    roomType: {
                      ...roomType,
                      type: value,
                    },
                  }),
                );
              }}
              options={ROOM_TYPE_OPTIONS}
            />
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Amount beds:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE} textAlign={'center'}>
            <Select
              value={amountBed}
              onChange={(value: string) => {
                dispatch(
                  setAction({
                    ...creatingEntity,
                    roomType: {
                      ...roomType,
                      amountBed: value,
                    },
                  }),
                );
              }}
              options={AMOUNT_BED_OPTIONS}
            />
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
                name={'roomPrice'}
                value={basePrice}
                onChange={(e) =>
                  dispatch(
                    setAction({
                      ...creatingEntity,
                      roomType: {
                        ...roomType,
                        basePrice: e.target.value,
                      },
                    }),
                  )
                }
              />
            </Container>
          </Container>
        </Flex>

        <Flex
          justifyContent={'space-between'}
          minWidth={'80%'}
          margin={'0.4rem 0 0 0'}
        >
          <Container flex={'0.4'}>
            <Submit onClick={() => changeTab && changeTab('1')}>Back</Submit>
          </Container>
          <Container flex={'0.4'}>
            <Submit
              onClick={() => {
                checkAndSend({
                  roomNumber: roomNumber,
                  roomType: {
                    type: type,
                    basePrice: basePrice,
                    amountBed: amountBed,
                  },
                  dispatch: dispatch,
                  graphql: graphql,
                  changeTab: changeTab,
                });
              }}
              onBlur={() => {
                if (successMessage) dispatch(setEntitySuccessAction(''));

                if (errorMessage) dispatch(setEntityErrorAction(''));
              }}
            >
              {isLoading ? 'Loading...' : mockButton}
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

export default CreateRoomForm;
