import React, { useEffect } from 'react';
import Form from '../../../../components/primitives/form/Form';
import Container from '../../../../components/primitives/wrapper/Container';
import { ICreateTableForm } from '../interfaces';
import Flex from '../../../../components/primitives/flex/Flex';
import Title from '../../../../components/primitives/title/Title';
import Submit from '../../../../components/primitives/submit/Submit';
import {
  FLEX_INPUT_VALUE,
  FLEX_VALUE,
  flexWrapProps,
} from '../../../../components/composites/CreateForm/CreateForm';
import Select from '../../../../components/primitives/select/Select';
import { ROOM_TYPE_OPTIONS } from '../../Room/СreateRoomPage/CreateRoomForm';
import { AMOUNT_SEATS_OPTIONS } from '../ChangeTablePage/ChangeTableForm';
import Input from '../../../../components/primitives/input/generic-input/Input';
import { inputProps } from '../../../../components/primitives/input/SignInLogin';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import SuccessLine from '../../../../components/primitives/successLine/SuccessLine';
import { initialCreatingRoomState } from '../../../../redux/reducers/room.reducer';
import { initialCreatingTableState } from '../../../../redux/reducers/meal.reducer';
import { useSelector } from 'react-redux';

const MAX_TABLES_AMOUNT = 12;

const CreateTableForm = ({
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
}: ICreateTableForm) => {
  let { amountSeats, tableNumber } = creatingEntity;
  useEffect(() => {
    if (data) {
      dispatch(setEntitySuccessAction('Created'));
      dispatch(setAction(initialCreatingTableState));
    }
  }, [data, setAction]);

  return (
    <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
      <Flex flexDirection={'column'} alignItems={'center'} minWidth={'100%'}>
        <Title>{title}</Title>
        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Table Number:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE}>
            <Container textAlign={'center'}>
              <Input
                {...inputProps}
                minWidth={'50%'}
                name={'name'}
                value={tableNumber}
                onChange={(e) =>
                  dispatch(
                    setAction({
                      ...creatingEntity,
                      tableNumber: e.target.value,
                    }),
                  )
                }
              />
            </Container>
          </Container>
        </Flex>

        <Flex {...flexWrapProps}>
          <Container flex={FLEX_VALUE} alignSelf={'center'}>
            <Flex>Amount seats:</Flex>
          </Container>
          <Container flex={FLEX_INPUT_VALUE} textAlign={'center'}>
            <Select
              value={amountSeats}
              onChange={(value) => {
                dispatch(
                  setAction({
                    ...creatingEntity,
                    amountSeats: value,
                  }),
                );
              }}
              options={AMOUNT_SEATS_OPTIONS}
            />
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
                  tableNumber: tableNumber,
                  amountSeats: amountSeats,
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

export default CreateTableForm;
