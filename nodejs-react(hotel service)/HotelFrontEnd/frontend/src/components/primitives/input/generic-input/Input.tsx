import React, { PropsWithChildren } from 'react';
import { getStyledInput } from './styles';
import { InputProps } from '../input.props';

const StyledInput = getStyledInput();

const Input = (props: PropsWithChildren<InputProps>) => {
  return <StyledInput {...props} />;
};

export default Input;
