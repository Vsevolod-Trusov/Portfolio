import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { StyleProps } from '../../../../styles/style.type';
import Submit from '../Submit';
import { ButtonProps } from '../button.props';

const StyledDeleteButton = styled(Submit)<StyleProps>((props: any) => ({
  backgroundColor: props.backgroundColor || props.theme.colors.errorColor,
  ':hover': {
    backgroundColor: props.theme.colors.errorColorHover,
    transition: '.2s',
  },

  ':active': {
    backgroundColor: props.theme.colors.errorColorActive,
    transition: '.2s',
  },

  ':disabled': {
    backgroundColor: props.theme.colors.errorColorDisabled,
    transition: '.2s',
  },
}));

const DeleteButton = (props: PropsWithChildren<ButtonProps>) => {
  return <StyledDeleteButton {...props} />;
};

export default DeleteButton;
