import React, { useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import { Box, Tab } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabPanelIml from '../../../components/composites/TabPanel/TabPanelIml';
import Container from '../../../components/primitives/wrapper/Container';
import {
  useDeleteMealMutation,
  useMealOrdersLazyQuery,
  useMealsLazyQuery,
  useUpdateMealMutation,
} from './data/meal.generated';
import OrderTableInfoPanel from './OrderTableInfoPanel/OrderTableInfoPanel';
import { useDispatch, useSelector } from 'react-redux';
import MealsInfoPanel from './MealsInfoPanel/MealsInfoPanel';
import ChangeForm, {
  ISelectedEntity,
} from '../../../components/composites/ChangeForm/ChangeForm';
import { setChangingMealAction } from '../../../redux/reducers/meal.reducer';
import CreateMealPage from './CreateMealPage/CreateMealPage';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const SELECT_MEAL = 'Select meal';

const MealPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getMeals, queryProps] = useMealsLazyQuery();
  const [getMealOrders, orderProps] = useMealOrdersLazyQuery();
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [deleteMeal, deletedMealProps] = useDeleteMealMutation();
  const [updateMeal, updatedMealProps] = useUpdateMealMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const changingMeal = useSelector(
    (state: any) => state.meal.adminChangingMeal,
  );

  useEffect(() => {
    if (queryProps.error) {
      if (queryProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [queryProps.error]);

  useEffect(() => {
    if (orderProps.error) {
      if (orderProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [orderProps.error]);

  useEffect(() => {
    if (deletedMealProps.error) {
      if (deletedMealProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [deletedMealProps.error]);

  useEffect(() => {
    if (updatedMealProps.error) {
      if (updatedMealProps.error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      }
    }
  }, [updatedMealProps.error]);

  useEffect(() => {
    if (!queryProps.data) {
      getMeals();
    }

    if (!orderProps.data) {
      getMealOrders();
    }

    if (deletedMealProps.data) {
      dispatch(setChangingMealAction({}));
      setValue('1');
    }
  }, [orderProps.data, queryProps.data, deletedMealProps.data]);

  const checkAndSendUpdate = (selectedMeal: ISelectedEntity) => {
    if (!selectedMeal.description) {
      setErrorMessage('Fill in description');
      return;
    }

    if (!+selectedMeal.price) {
      if (selectedMeal.price.length === 0) {
        setErrorMessage('Wrong price value');
        return;
      }

      if (+selectedMeal.price !== 0) {
        setErrorMessage('Wrong price value');
        return;
      }
    }

    updateMeal({
      variables: {
        meal: {
          mealName: selectedMeal.name,
          mealDescription: selectedMeal.description,
          mealPrice: +selectedMeal.price,
        },
      },
    });

    dispatch(setChangingMealAction({}));
    setValue('1');
  };

  return (
    <Container margin={'1rem 0'}>
      <TabPanelIml>
        <TabContext value={value}>
          <Container margin={'0 24px'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
                textColor='secondary'
                indicatorColor='secondary'
                centered
              >
                <Tab label='Meals' value='1' />
                <Tab label='Orders' value='2' />
                <Tab label='Change' value='3' />
                <Tab label='Create' value='4' />
              </TabList>
            </Box>
          </Container>

          <TabPanel value='1'>
            <MealsInfoPanel
              isLoading={queryProps.loading}
              data={queryProps.data ? queryProps.data.getAllMeals : []}
              refetch={queryProps.refetch}
              getMeals={getMeals}
              dispatch={dispatch}
              setValue={setValue}
            />
          </TabPanel>

          <TabPanel value='2'>
            <OrderTableInfoPanel
              isLoading={orderProps.loading}
              data={orderProps.data ? orderProps.data.getAllMealOrders : []}
              refetch={orderProps.refetch}
              getMealOrders={getMealOrders}
              dispatch={dispatch}
            />
          </TabPanel>
          <TabPanel value='3'>
            <ChangeForm
              selectedEntity={changingMeal}
              mock={SELECT_MEAL}
              name={changingMeal.name}
              price={changingMeal.price}
              description={changingMeal.description}
              dispatch={dispatch}
              setAction={setChangingMealAction}
              changeTab={setValue}
              graphqlDelete={deleteMeal}
              checkAndSend={checkAndSendUpdate}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </TabPanel>
          <TabPanel value={'4'}>
            <CreateMealPage changeTab={setValue} />
          </TabPanel>
        </TabContext>
      </TabPanelIml>
    </Container>
  );
};

export default MealPage;
