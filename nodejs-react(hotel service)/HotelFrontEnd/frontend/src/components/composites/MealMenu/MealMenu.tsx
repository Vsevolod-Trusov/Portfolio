import React, { useEffect, useState } from 'react';
import { useGetMealsLazyQuery, useGetMealsQuery } from './mealMenu.generated';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMealsAction,
  setSelectMealAction,
  setSelectMealsAction,
} from '../../../redux/reducers/meal.reducer';
import Popup from '../Popup/Popup';
import EntityInfoPanel from '../EntityPanelInfo/EntityPanelInfo';
import { MEAL_COLUMNS } from '../../../pages/AdminPages/Meal/meal.columns';
import Container from '../../primitives/wrapper/Container';
import Submit from '../../primitives/submit/Submit';
import { useNavigate } from 'react-router-dom';
import { inputProps } from '../../primitives/input/SignInLogin';
import Input from '../../primitives/input/generic-input/Input';
import ErrorLine from '../../primitives/errorLine/ErrorLine';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';

const MealMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let meals = useSelector((state: any) => state.meal.meals);
  let selectedMeals = useSelector((state: any) => state.meal.selectedMeals);
  const [getMeals, { data, loading, error }] = useGetMealsLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [IsErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const selectedMeal = useSelector((state: any) => state.meal.selectedMeal);

  let { amount } = selectedMeal;

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (!data) {
      getMeals();
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setMealsAction(data.getAllMeals));
    }
  }, [data]);

  const handleOpenErrorPopup = () => {
    setIsErrorPopupOpen(true);
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else {
        handleOpenErrorPopup();
      }
    }
  }, [error]);

  return (
    <div>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} zIndex={'99'}>
        <Container backgroundColor={'transparent'}>Select amount:</Container>
        <Input
          {...inputProps}
          name={'count'}
          type={'number'}
          value={amount}
          onChange={(e) => {
            dispatch(
              setSelectMealAction({
                ...selectedMeal,
                amount: +e.target.value,
              }),
            );
          }}
          min={'1'}
        />
        <Container backgroundColor={'transparent'}>
          <Submit
            onClick={() => {
              const changedArray = selectedMeals.map((meal: any) => {
                if (meal.key == selectedMeal.key) {
                  return selectedMeal;
                }
                return meal;
              });
              dispatch(setSelectMealsAction(changedArray));
              handleClosePopup();
            }}
          >
            Ok
          </Submit>
        </Container>
      </Popup>

      <Container padding={'1rem'}>
        <EntityInfoPanel
          data={meals}
          columns={MEAL_COLUMNS}
          onRowClickedHandler={(row: any) => {
            let foundItem = selectedMeals.find(
              (meal: any) => meal.key == row.mealName,
            );

            if (!foundItem) {
              selectedMeals.push({
                key: row.mealName,
                amount: 1,
                basePrice: row.mealPrice,
              });
              dispatch(setSelectMealsAction(selectedMeals));
              dispatch(
                setSelectMealAction({
                  key: row.mealName,
                  amount: 1,
                  basePrice: row.mealPrice,
                }),
              );
            } else {
              dispatch(setSelectMealAction(foundItem));
              dispatch(setSelectMealsAction(selectedMeals));
            }

            handleOpenPopup();
          }}
        />
      </Container>
      <Container backgroundColor={'transparent'}>
        <Submit
          onClick={() => {
            navigate('/HotelFrontEnd/meal_order/');
          }}
        >
          Back
        </Submit>
      </Container>

      <Popup
        isOpen={IsErrorPopupOpen}
        onClose={handleCloseErrorPopup}
        zIndex={'99'}
      >
        <ErrorLine backgroundColor={'transparent'}>
          {error && error.message}
        </ErrorLine>
        <Container>
          <Submit onClick={() => handleCloseErrorPopup()}>Ok</Submit>
        </Container>
      </Popup>
    </div>
  );
};

export default MealMenu;

// {meals &&
//         meals.map((item: any) => {
//           return (
//             <Flex>
//               <div key={uuidv4()}>{item.mealName}</div>
//               <div key={uuidv4()}>{item.mealPrice}</div>
//
//               <button
//                 onClick={() => {
//                   let foundItem = selectedMeals.find(
//                     (meal: any) => meal.key === item.mealName,
//                   );
//                   if (!foundItem) {
//                     let length = selectedMeals.push({
//                       key: item.mealName,
//                       amount: 1,
//                       basePrice: item.mealPrice,
//                     });
//                     dispatch(setSelectMealsAction(selectedMeals));
//                     dispatch(setSelectMealAction(selectedMeals[length - 1]));
//                   } else {
//                     foundItem.amount += 1;
//                     dispatch(setSelectMealsAction(selectedMeals));
//                     dispatch(setSelectMealAction(foundItem));
//                   }
//
//                   handleOpenPopup();
//                 }}
//               >
//                 Add
//               </button>
//             </Flex>
//           );
//         })}
