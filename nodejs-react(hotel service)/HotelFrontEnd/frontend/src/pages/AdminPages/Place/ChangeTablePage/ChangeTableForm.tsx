import React from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import Flex from '../../../../components/primitives/flex/Flex';
import Title from '../../../../components/primitives/title/Title';
import {
  FLEX_INPUT_VALUE,
  FLEX_VALUE,
  flexWrapProps,
} from '../../../../components/composites/CreateForm/CreateForm';
import Select from '../../../../components/primitives/select/Select';
import Submit from '../../../../components/primitives/submit/Submit';
import DeleteButton from '../../../../components/primitives/submit/DeleteButton/DeleteButton';
import ErrorLine from '../../../../components/primitives/errorLine/ErrorLine';
import Form from '../../../../components/primitives/form/Form';
import { IChangeTableForm } from '../interfaces';
import {
  initialChangingTableState,
  setChangingTableAction,
} from '../../../../redux/reducers/meal.reducer';

export const AMOUNT_SEATS_OPTIONS = [
  { label: '2', value: '2' },
  { label: '4', value: '4' },
];

const ChangeTableForm = ({
  selectedEntity,
  mock,
  dispatch,
  setAction,
  graphqlDelete,
  checkAndSend,
  errorMessage,
  setErrorMessage,
  changeTab,
}: IChangeTableForm) => {
  let { tableNumber, amountSeats } = selectedEntity;

  return (
    <Form maxWidth={'90%'} minHeight={'100%'} display={'flex'}>
      {!tableNumber ? (
        mock
      ) : (
        <Flex flexDirection={'column'} alignItems={'center'} minWidth={'100%'}>
          <Title>Table Number: {tableNumber}</Title>
          <Flex {...flexWrapProps}>
            <Container flex={FLEX_VALUE} alignSelf={'center'}>
              <Flex>Amount seats:</Flex>
            </Container>
            <Container flex={FLEX_INPUT_VALUE} textAlign={'center'}>
              <Select
                value={amountSeats}
                onChange={(value) => {
                  dispatch(
                    setChangingTableAction({
                      ...selectedEntity,
                      amountSeats: value,
                    }),
                  );
                }}
                options={AMOUNT_SEATS_OPTIONS}
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
                    number: tableNumber,
                  },
                });
                changeTab && changeTab('1');
                dispatch(setAction(initialChangingTableState));
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

export default ChangeTableForm;
