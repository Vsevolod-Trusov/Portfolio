import React, { PropsWithChildren } from 'react';
import { getStyledForm } from './styles';
import { StyleProps } from '../../../styles/style.type';

const StyledForm = getStyledForm();

const formProps = {
  padding: '1rem',
  maxWidth: '350px',
  borderRadius: '0.5rem',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

const Form = (props: PropsWithChildren<StyleProps>) => {
  return <StyledForm {...formProps} {...props} />;
};

export default Form;
