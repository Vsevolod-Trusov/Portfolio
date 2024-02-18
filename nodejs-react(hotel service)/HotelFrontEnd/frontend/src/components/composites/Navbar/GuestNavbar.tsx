import React from 'react';
import { StyledNavbar } from './UserNavbar';
import Container from '../../primitives/wrapper/Container';
import { Link } from 'react-router-dom';
import Flex from '../../primitives/flex/Flex';

const GuestNavbar = () => {
  return (
    <StyledNavbar>
      <Container padding={'0'}>
        <Flex>
          <Container>
            <Link to='/HotelFrontEnd/signIn'>SignIn</Link>
          </Container>
          <Container>
            <Link to='/HotelFrontEnd/signUp'>SignUp</Link>
          </Container>
        </Flex>
      </Container>
    </StyledNavbar>
  );
};

export default GuestNavbar;
