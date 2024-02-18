import React, { PropsWithChildren } from 'react';
import { getStyledInput } from './generic-input/styles';
import { InputProps } from './input.props';

const GenericInput = getStyledInput();

export const inputProps = {
  margin: '8px 0',
  padding: '1rem',
  minWidth: '100%',

  borderRadius: '0.5rem',
  outline: 'none',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '100',
  letterSpacing: '0.075rem',
  lineHeight: '1.25rem',
};

const SignInLogin = (props: PropsWithChildren<InputProps>) => {
  return <GenericInput {...inputProps} {...props} />;
};

export default SignInLogin;
