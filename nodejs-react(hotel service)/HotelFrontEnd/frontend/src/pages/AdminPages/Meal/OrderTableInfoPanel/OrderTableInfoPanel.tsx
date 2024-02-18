import React, { Dispatch, PropsWithChildren, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ORDER_MEAL_COLUMNS } from '../meal.columns';
import DataTableImpl from '../../../../components/composites/DataTable/DataTable';
import Container from '../../../../components/primitives/wrapper/Container';
import Submit from '../../../../components/primitives/submit/Submit';
import Flex from '../../../../components/primitives/flex/Flex';
import Title from '../../../../components/primitives/title/Title';
import DeleteButton from '../../../../components/primitives/submit/DeleteButton/DeleteButton';
import Popup from '../../../../components/composites/Popup/Popup';
import { AnyAction } from 'redux';
import { setDeletingOrderMealAction } from '../../../../redux/reducers/meal.reducer';
import { useDeleteMealOrderMutation } from '../data/meal.generated';
import { useSelector } from 'react-redux';
import { SIGN_IN, UNAUTHORIZED } from '../../../../constants';
import { useNavigate } from 'react-router-dom';

interface IOrderTablePanel {
  isLoading: boolean;
  data: any;
  refetch: any;
  getMealOrders: any;
  dispatch: Dispatch<AnyAction>;
}

const OrderTableInfoPanel = ({
  isLoading,
  data,
  refetch,
  getMealOrders,
  dispatch,
}: PropsWithChildren<IOrderTablePanel>) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const deletingOrder = useSelector(
    (state: any) => state.meal.adminDeletingOrderMeal,
  );

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [deleteOrderMeal, deletedProps] = useDeleteMealOrderMutation();

  useEffect(() => {
    if (deletedProps.error) {
      if (deletedProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [deletedProps.error]);

  return (
    <Container padding={'0'}>
      <Flex justifyContent={'end'}>
        <Container>
          <Submit onClick={() => (data ? refetch() : getMealOrders())}>
            Update
          </Submit>
        </Container>
      </Flex>
      <DataTableImpl>
        {isLoading ? (
          'Loading'
        ) : (
          <DataTable
            columns={ORDER_MEAL_COLUMNS}
            data={data}
            pagination
            highlightOnHover
            paginationRowsPerPageOptions={[5, 10, 15]}
            onRowClicked={(row, event) => {
              dispatch(setDeletingOrderMealAction(row));
              handleOpenPopup();
            }}
          />
        )}
      </DataTableImpl>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        margin={'-250px 0 0 0 '}
      >
        <Title>Deleting confirm</Title>
        <Flex minWidth={'90%'} margin={'2rem 0 0 0'}>
          <Submit
            minWidth={'30%'}
            onClick={() => {
              handleClosePopup();
            }}
          >
            Back
          </Submit>

          <DeleteButton
            minWidth={'30%'}
            onClick={() => {
              deleteOrderMeal({
                variables: {
                  id: deletingOrder._id,
                },
              });
              handleClosePopup();
            }}
            backgroundColor={'#da0000'}
          >
            {deletedProps.loading ? 'Loading...' : 'Delete'}
          </DeleteButton>
        </Flex>
      </Popup>
    </Container>
  );
};

export default OrderTableInfoPanel;
