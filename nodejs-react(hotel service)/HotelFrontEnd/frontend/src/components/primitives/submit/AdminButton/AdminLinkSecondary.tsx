import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { StyleProps } from '../../../../styles/style.type';
import AdminLink from './AdminLink';
import { ButtonProps } from '../button.props';

const AdminSecondary = styled(AdminLink)<StyleProps>((props) => ({
  backgroundColor: '#b34ed2',

  ':hover': {
    backgroundColor: '#8b2aa8',
    transition: '.2s',
  },

  ':active': {
    backgroundColor: '#601f73',
    transition: '.1s',
  },
}));

const AdminLinkSecondary = (props: PropsWithChildren<ButtonProps>) => {
  return <AdminSecondary {...props} />;
};

export default AdminLinkSecondary;
