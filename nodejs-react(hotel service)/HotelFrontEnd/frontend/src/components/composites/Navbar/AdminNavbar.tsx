import React from 'react';
import Flex from '../../primitives/flex/Flex';
import Container from '../../primitives/wrapper/Container';
import { useNavigate } from 'react-router-dom';
import AdminLink from '../../primitives/submit/AdminButton/AdminLink';
import AdminLinkSecondary from '../../primitives/submit/AdminButton/AdminLinkSecondary';

const linkContainerProps = {
  width: '100%',
  padding: '0',
};

const buttonPrimaryProps = {
  margin: '0',
  color: '#761c91',
  backgroundColor: 'transparent',
  minWidth: '100%',
  borderRadius: '0',
};

const buttonSecondaryProps = {
  margin: '0',
  color: '#fff',
  backgroundColor: 'transparent',
  minWidth: '100%',
  borderRadius: '0',
};

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      flexDirection={'column'}
      alignItems={'center'}
      width={'100%'}
      margin={'1rem 0 0 0'}
    >
      <Flex
        height={'5vh'}
        backgroundColor={'#b34ed2'}
        color={'#fff'}
        minWidth={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {'Admin Panel'}
      </Flex>

      <Container {...linkContainerProps}>
        <AdminLink
          {...buttonPrimaryProps}
          onClick={() => navigate('/HotelFrontEnd/')}
        >
          User main
        </AdminLink>
      </Container>

      <Container {...linkContainerProps}>
        <AdminLinkSecondary
          onClick={() => navigate('/HotelFrontEnd/room')}
          {...buttonSecondaryProps}
        >
          Room
        </AdminLinkSecondary>
      </Container>

      <Container {...linkContainerProps}>
        <AdminLink
          onClick={() => navigate('/HotelFrontEnd/admin/room_service')}
          {...buttonPrimaryProps}
        >
          Room Service
        </AdminLink>
      </Container>

      <Container {...linkContainerProps}>
        <AdminLinkSecondary
          onClick={() => navigate('/HotelFrontEnd/meal')}
          {...buttonSecondaryProps}
        >
          Meal
        </AdminLinkSecondary>
      </Container>

      <Container {...linkContainerProps}>
        <AdminLink
          onClick={() => navigate('/HotelFrontEnd/place')}
          {...buttonPrimaryProps}
        >
          Table
        </AdminLink>
      </Container>

      <Container {...linkContainerProps}>
        <AdminLinkSecondary
          onClick={() => navigate('/HotelFrontEnd/tour')}
          {...buttonSecondaryProps}
        >
          Tour
        </AdminLinkSecondary>
      </Container>

      <Container {...linkContainerProps}>
        <AdminLink
          onClick={() => navigate('/HotelFrontEnd/hobby')}
          {...buttonPrimaryProps}
        >
          Hobbies
        </AdminLink>
      </Container>

      <Container {...linkContainerProps}>
        <AdminLinkSecondary
          onClick={() => navigate('/HotelFrontEnd/news')}
          {...buttonSecondaryProps}
        >
          News
        </AdminLinkSecondary>
      </Container>
    </Flex>
  );
};

export default AdminNavbar;
