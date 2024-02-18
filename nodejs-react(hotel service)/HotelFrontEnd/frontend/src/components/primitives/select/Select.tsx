import React, { useState } from 'react';
import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';

type Option = {
  value: any;
  label: string;
};

type SelectProps = {
  options: Option[];
  value: any;
  onChange: (value: string) => void;
};

const StyledSelect = styled('select')<StyleProps>((props) => ({
  padding: '0.5rem',
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  borderRadius: '0.5rem',
  border: props.border || `1px solid ${props.theme.colors.borderLoginInput}`,
  backgroundColor:
    props.backgroundColor || props.theme.colors.loginInputBackground,
  color: props.color || props.theme.colors.fontColor,

  ':focus': {
    outline: `1px solid ${props.theme.colors.borderFocused}`,
    transition: '.1s',
  },
}));

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledSelect value={value} onChange={handleChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
