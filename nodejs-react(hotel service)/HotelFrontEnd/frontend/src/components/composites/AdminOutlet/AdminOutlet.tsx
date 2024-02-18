import React, { useEffect } from 'react';
import Container from '../../primitives/wrapper/Container';
import UserNavbar from '../Navbar/UserNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetRoleQuery } from '../Navbar/navbar.generated';
import GuestNavbar from '../Navbar/GuestNavbar';
import { ADMIN_ROLE } from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { SIGN_IN, UNAUTHORIZED } from '../../../constants';

const AdminOutlet = () => {
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem('token');

  if (!token) {
    return <Outlet />;
  }

  const { data, loading, error } = useGetRoleQuery({
    variables: {
      token: token,
    },
  });

  useEffect(() => {
    if (error) {
      if (error.message === UNAUTHORIZED) {
        navigate(SIGN_IN);
      } else alert(`Admin outlet: ${error.message}`);
    }
  }, [error]);

  return (
    <Container padding={'0'}>
      {data && data.getRole.role === ADMIN_ROLE ? (
        <>
          <UserNavbar />
          <Outlet />
        </>
      ) : (
        <Outlet />
      )}
    </Container>
  );
};

export default AdminOutlet;
