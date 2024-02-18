import React, { PropsWithChildren } from 'react';
import { getSubmit } from './styles';
import { ButtonProps } from './button.props';

export const StyledButton = getSubmit();

const submitProps = {
  display: 'block',
  padding: ' 0.75rem 1.25rem',
  margin: '0.85rem auto',
  minWidth: '60%',
  color: '#ffffff',
  fontFamily: 'Montserrat',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  borderRadius: '0.5rem',
  border: 'none',
  textTransform: 'uppercase',
};

const Submit = (props: PropsWithChildren<ButtonProps>) => {
  return <StyledButton {...submitProps} {...props} />;
};

export default Submit;
