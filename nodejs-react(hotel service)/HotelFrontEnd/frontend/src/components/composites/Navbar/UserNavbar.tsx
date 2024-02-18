import React from 'react';
import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';
import Container from '../../primitives/wrapper/Container';
import Flex from '../../primitives/flex/Flex';
import { Link } from 'react-router-dom';

export const StyledNavbar = styled('div')<StyleProps>`
  @media ${(props) => props.theme.media.phoneHorizontal} {
    display: none;
  }
  @media ${(props) => props.theme.media.minTabletVertical} {
    display: block;
  }
`;

const UserNavbar = () => {
  return (
    <StyledNavbar>
      <Container padding={'0'}>
        <Flex>
          <Container>
            <Link to='/HotelFrontEnd/'>Main</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/signIn'>SignIn</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/signUp'>SignUp</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/meal_order'>Meal</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/order_hobby'>Hobbies</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/order_tour'>Tours</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/feedback'>Feedback</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/profile'>Profile</Link>
          </Container>
        </Flex>
      </Container>
    </StyledNavbar>
  );
};

export default UserNavbar;
