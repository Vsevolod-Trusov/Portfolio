import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Container from '../../primitives/wrapper/Container';
import UserNavbar from './UserNavbar';
import { useGetRoleQuery } from './navbar.generated';
import Flex from '../../primitives/flex/Flex';
import AdminNavbar from './AdminNavbar';
import GuestNavbar from './GuestNavbar';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';

export const ADMIN_ROLE = 'admin';

const Navbar = () => {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem('token');

  if (!token) {
    return (
      <Container padding={'0'}>
        <GuestNavbar />
        <Outlet />
      </Container>
    );
  }

  const { data, loading, error } = useGetRoleQuery({
    variables: {
      token: token,
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else alert(`Navbar: ${error.message}`);
    }
  }, [error]);

  return (
    <Container>
      {loading ? (
        <div>Loading</div>
      ) : data && data.getRole.role === ADMIN_ROLE ? (
        <Flex>
          <Container flex={'0.2'} width={'20vw'} padding={'0'}>
            <AdminNavbar />
          </Container>
          <Container padding={'0'} flex={'0.8'} width={'80vw'} height={'100vh'}>
            <Outlet />
          </Container>
        </Flex>
      ) : (
        <Container padding={'0'}>
          <UserNavbar />
          <Outlet />
        </Container>
      )}
    </Container>
  );
};

export default Navbar;
