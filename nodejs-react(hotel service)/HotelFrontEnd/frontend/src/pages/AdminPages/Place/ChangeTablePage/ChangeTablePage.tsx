import React, { useEffect, useState } from 'react';
import Container from '../../../../components/primitives/wrapper/Container';
import ChangeTableForm from './ChangeTableForm';
import { checkPrice } from '../../../../utils/form.cheks.utils';
import {
  initialChangingTableState,
  setChangingTableAction,
} from '../../../../redux/reducers/meal.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { IChangingTable } from '../interfaces';
import {
  useDeleteTableMutation,
  useUpdateTableMutation,
} from '../data/place.generated';
import { IForm } from '../../interfaces';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

const SELECT_TABLE = 'Select Table';

const ChangeTablePage = ({ changeTab }: IForm) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changingTable = useSelector((state: any) => state.meal.changingTable);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [updateTable, updatedTableProps] = useUpdateTableMutation();
  const [deleteTable, deletedTableProps] = useDeleteTableMutation();

  const checkAndSendUpdate = ({ tableNumber, amountSeats }: IChangingTable) => {
    if (!checkPrice(tableNumber)) {
      setErrorMessage('Wrong table number value');
      return;
    }

    if (!checkPrice(amountSeats)) {
      setErrorMessage('Wrong amount seats value');
      return;
    }

    updateTable({
      variables: {
        table: {
          tableNumber: tableNumber,
          amountSeats: +amountSeats,
        },
      },
    });

    changeTab && changeTab('1');
    dispatch(setChangingTableAction(initialChangingTableState));
  };

  useEffect(() => {
    if (updatedTableProps.error) {
      if (updatedTableProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [updatedTableProps.error]);

  useEffect(() => {
    if (deletedTableProps.error) {
      if (deletedTableProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [deletedTableProps.error]);

  return (
    <Container padding={'0'}>
      <ChangeTableForm
        selectedEntity={changingTable}
        mock={SELECT_TABLE}
        dispatch={dispatch}
        setAction={setChangingTableAction}
        graphqlDelete={deleteTable}
        checkAndSend={checkAndSendUpdate}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        changeTab={changeTab}
      />
    </Container>
  );
};

export default ChangeTablePage;
