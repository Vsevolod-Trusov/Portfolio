import React, { PropsWithChildren } from 'react';
import { ButtonProps } from '../button.props';
import styled from 'styled-components';
import Submit, { StyledButton } from '../Submit';
import { StyleProps } from '../../../../styles/style.type';

const AdminLinkButton = styled(Submit)<StyleProps>((props) => ({
  ':hover': {
    backgroundColor: '#ded8d8',
    transition: '.2s',
  },

  ':active': {
    backgroundColor: '#9d9a9a',
    transition: '.1s',
  },
}));

const AdminLink = (props: PropsWithChildren<ButtonProps>) => {
  return <AdminLinkButton {...props} />;
};

export default AdminLink;
