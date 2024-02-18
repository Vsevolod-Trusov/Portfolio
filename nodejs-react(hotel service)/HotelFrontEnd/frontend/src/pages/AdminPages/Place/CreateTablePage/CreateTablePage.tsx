import React, { useEffect } from 'react';
import CreateTableForm from './CreateTableForm';
import Container from '../../../../components/primitives/wrapper/Container';
import { IForm } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateTableMutation } from '../data/place.generated';
import {
  setCreatingTableAction,
  setTableErrorAction,
  setTableSuccessAction,
} from '../../../../redux/reducers/meal.reducer';
import { checkPrice } from '../../../../utils/form.cheks.utils';
import { ICheckAndSendTableProps } from '../interfaces';

const CREATING_FORM = 'Creating Table';
const CREATE_BUTTON = 'Create Table';

const checkAndSend = ({
  tableNumber,
  amountSeats,
  dispatch,
  graphql,
}: ICheckAndSendTableProps) => {
  if (!tableNumber) {
    dispatch(setTableErrorAction('Fill in table number'));
    return;
  }

  if (!checkPrice(amountSeats)) {
    dispatch(setTableErrorAction('Invalid amount seats value'));
    return;
  }

  graphql({
    variables: {
      table: {
        tableNumber: tableNumber,
        amountSeats: +amountSeats,
      },
    },
  });
};

const CreateTablePage = ({ changeTab }: IForm) => {
  const dispatch = useDispatch();
  const successMessage = useSelector((state: any) => state.meal.tableSuccess);
  const errorMessage = useSelector((state: any) => state.meal.tableError);
  const creatingTable = useSelector((state: any) => state.meal.creatingTable);

  const [createTable, { data, loading, error }] = useCreateTableMutation();
  useEffect(() => {
    if (error) {
      dispatch(setTableErrorAction(error.message));
    }
  }, [error]);

  return (
    <Container padding={'0'}>
      <CreateTableForm
        title={CREATING_FORM}
        successMessage={successMessage}
        errorMessage={errorMessage}
        setEntitySuccessAction={setTableSuccessAction}
        setEntityErrorAction={setTableErrorAction}
        dispatch={dispatch}
        setAction={setCreatingTableAction}
        mockButton={CREATE_BUTTON}
        changeTab={changeTab}
        checkAndSend={checkAndSend}
        creatingEntity={creatingTable}
        graphql={createTable}
        data={data}
        isLoading={loading}
      />
    </Container>
  );
};

export default CreateTablePage;
