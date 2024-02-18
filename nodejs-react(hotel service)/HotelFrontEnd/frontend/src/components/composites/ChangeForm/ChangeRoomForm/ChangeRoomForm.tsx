import React from 'react';
import Form from '../../../primitives/form/Form';
import Flex from '../../../primitives/flex/Flex';
import Title from '../../../primitives/title/Title';
import Container from '../../../primitives/wrapper/Container';
import Input from '../../../primitives/input/generic-input/Input';
import { inputProps } from '../../../primitives/input/SignInLogin';
import TextArea from '../../../primitives/textarea/TextArea';
import Submit from '../../../primitives/submit/Submit';
import DeleteButton from '../../../primitives/submit/DeleteButton/DeleteButton';
import ErrorLine from '../../../primitives/errorLine/ErrorLine';
import Select from '../../../primitives/select/Select';
import {
  initialChangingRoomState,
  setChangingRoomAction,
} from '../../../../redux/reducers/room.reducer';
import { IChangeForm } from '../ChangeForm';
import {
  FLEX_INPUT_VALUE,
  FLEX_VALUE,
  flexWrapProps,
} from '../../CreateForm/CreateForm';

export const AMOUNT_BED_OPTIONS = [
  { label: '2', value: '2' },
  {
    label: '4',
    value: '4',
  },
];

const TYPE_OPTIONS = [
  { label: 'suite', value: 'suite' },
  {
    label: 'standard',
    value: 'standard',
  },
  {
    label: 'deluxe',
    value: 'deluxe',
  },
];

const ChangeRoomForm = ({
  mock,
  selectedEntity,
  name,
  dispatch,
  setAction,
  changeTab,
  graphqlDelete,
  checkAndSend,
  errorMessage,
  setErrorMessage,
}: IChangeForm) => {
  let { roomNumber, roomType } = selectedEntity;
  let { amountBed, basePrice, type } = roomType;
  return (
    <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
      {!name ? (
        mock
      ) : (
        <Flex flexDirection={'column'} alignItems={'center'} minWidth={'100%'}>
          <Title>{roomNumber}</Title>
          <Flex justifyContent={'space-between'} minWidth={'80%'}>
            <Container flex={FLEX_VALUE} alignSelf={'center'}>
              <Flex>Price:</Flex>
            </Container>
            <Container padding={'0'}>
              <Input
                name={'price'}
                type={'text'}
                value={basePrice}
                {...inputProps}
                onChange={(e) =>
                  dispatch(
                    setAction({
                      ...selectedEntity,
                      roomType: {
                        ...roomType,
                        basePrice: e.target.value,
                      },
                    }),
                  )
                }
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
                onChange={(value) => {
                  dispatch(
                    setChangingRoomAction({
                      ...selectedEntity,
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
              <Flex>Room Type:</Flex>
            </Container>
            <Container flex={FLEX_INPUT_VALUE} textAlign={'center'}>
              <Select
                value={type}
                onChange={(value) => {
                  dispatch(
                    setChangingRoomAction({
                      ...selectedEntity,
                      roomType: {
                        ...roomType,
                        type: value,
                      },
                    }),
                  );
                }}
                options={TYPE_OPTIONS}
              />
            </Container>
          </Flex>

          <Flex
            padding={'0'}
            margin={'1rem 0 0 0'}
            backgroundColor={'transparent'}
            minWidth={'90%'}
          >
            <Submit
              minWidth={'30%'}
              onClick={() => {
                changeTab && changeTab('1');
              }}
            >
              Back
            </Submit>

            <DeleteButton
              minWidth={'30%'}
              onClick={() => {
                graphqlDelete({
                  variables: {
                    name: selectedEntity.roomNumber,
                  },
                });
                changeTab && changeTab('1');
                dispatch(setAction(initialChangingRoomState));
              }}
            >
              Delete
            </DeleteButton>

            <Submit
              minWidth={'30%'}
              onClick={() => {
                checkAndSend(selectedEntity);
              }}
              onBlur={() => {
                if (errorMessage) {
                  setErrorMessage('');
                }
              }}
            >
              Change Room
            </Submit>
          </Flex>
          {errorMessage ? (
            <ErrorLine>{errorMessage}</ErrorLine>
          ) : (
            <ErrorLine visibility={'hidden'}>Mock</ErrorLine>
          )}
        </Flex>
      )}
    </Form>
  );
};

export default ChangeRoomForm;
