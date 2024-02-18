import React, { PropsWithChildren } from 'react';
import { getStyledMenu } from './Menu.style';
import Burger, { BurgerProps } from './Burger';
import { Link } from 'react-router-dom';
const StyledMenu = getStyledMenu();
const Menu: React.FC<PropsWithChildren<BurgerProps>> = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/HotelFrontEnd/">Main</Link>
      <Link to="/HotelFrontEnd/signIn">SignIn</Link>
      <Link to="/HotelFrontEnd/signUp">SignUp</Link>
      <Link to="/HotelFrontEnd/meal_order">Meal</Link>
      <Link to="/HotelFrontEnd/order_hobby">Hobbies</Link>
      <Link to="/HotelFrontEnd/order_tour">Tours</Link>
      <Link to="/HotelFrontEnd/feedback">Feedback</Link>
      <Link to="/HotelFrontEnd/profile">Profile</Link>
    </StyledMenu>
  );
};

export default Menu;
