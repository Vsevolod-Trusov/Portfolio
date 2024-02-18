import React, { Dispatch } from 'react';
import DataTable from 'react-data-table-component';
import { MEAL_COLUMNS } from '../meal.columns';
import DataTableImpl from '../../../../components/composites/DataTable/DataTable';
import Container from '../../../../components/primitives/wrapper/Container';
import { AnyAction } from 'redux';
import { setChangingMealAction } from '../../../../redux/reducers/meal.reducer';
import Submit from '../../../../components/primitives/submit/Submit';
import Flex from '../../../../components/primitives/flex/Flex';

interface IMealsInfoPanel {
  isLoading: boolean;
  data: any;
  refetch: any;
  getMeals: any;
  dispatch: Dispatch<AnyAction>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const MealsInfoPanel = ({
  isLoading,
  data,
  refetch,
  getMeals,
  dispatch,
  setValue,
}: IMealsInfoPanel) => {
  return (
    <Container padding={'0'}>
      <Flex justifyContent={'end'}>
        <Container>
          <Submit onClick={() => (data ? refetch() : getMeals())}>
            Update
          </Submit>
        </Container>
      </Flex>
      <DataTableImpl>
        {isLoading ? (
          'Loading'
        ) : (
          <DataTable
            columns={MEAL_COLUMNS}
            data={data}
            pagination
            highlightOnHover
            paginationRowsPerPageOptions={[5, 10, 15]}
            onRowClicked={(row, event) => {
              const { mealName, mealDescription, mealPrice } = row;
              const changingRow = {
                name: mealName,
                price: mealPrice,
                description: mealDescription,
              };
              dispatch(setChangingMealAction(changingRow));
              setValue('3');
            }}
          />
        )}
      </DataTableImpl>
    </Container>
  );
};

export default MealsInfoPanel;
