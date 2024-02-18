import React, { PropsWithChildren, useEffect } from 'react';
import CreateForm, {
  ICheckAndSendEntityProps,
} from '../../../../components/composites/CreateForm/CreateForm';
import { checkPrice } from '../../../../utils/form.cheks.utils';
import Container from '../../../../components/primitives/wrapper/Container';
import { IForm } from '../../interfaces';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {
  setCreatingMealAction,
  setMealErrorAction,
  setMealSuccessAction,
} from '../../../../redux/reducers/meal.reducer';
import { useCreateMealMutation } from '../data/meal.generated';

const CREATE_MEAL = 'Create meal';
const CREATE_MEAL_TITLE = 'Creating Meal';

const checkAndSend = ({
  name,
  description,
  price,
  dispatch,
  graphql,
}: ICheckAndSendEntityProps) => {
  if (!name) {
    dispatch(setMealErrorAction('Fill in name'));
    return;
  }

  if (!description) {
    dispatch(setMealErrorAction('Fill in description'));
    return;
  }

  if (!checkPrice(price)) {
    dispatch(setMealErrorAction('Invalid price value'));
    return;
  }

  graphql({
    variables: {
      meal: {
        mealName: name,
        mealDescription: description,
        mealPrice: +price,
      },
    },
  });
};
const CreateMealPage = (props: PropsWithChildren<IForm>) => {
  const dispatch = useDispatch();
  const creatingMeal = useSelector((state: any) => state.meal.creatingMeal);
  const successMessage = useSelector((state: any) => state.meal.mealSuccess);
  const errorMessage = useSelector((state: any) => state.meal.mealError);
  const [createMeal, { data, error, loading }] = useCreateMealMutation();

  useEffect(() => {
    if (error) {
      dispatch(setMealErrorAction(error.message));
    }
  }, [error]);

  return (
    <Container padding={'0'}>
      <CreateForm
        changeTab={props.changeTab}
        name={creatingMeal.name}
        description={creatingMeal.description}
        creatingEntity={creatingMeal}
        price={creatingMeal.price}
        dispatch={dispatch}
        setAction={setCreatingMealAction}
        graphql={createMeal}
        checkAndSend={checkAndSend}
        successMessage={successMessage}
        errorMessage={errorMessage}
        mockButton={CREATE_MEAL}
        data={data}
        isLoading={loading}
        title={CREATE_MEAL_TITLE}
        setEntitySuccessAction={setMealSuccessAction}
        setEntityErrorAction={setMealErrorAction}
      />
    </Container>
  );
};

export default CreateMealPage;
