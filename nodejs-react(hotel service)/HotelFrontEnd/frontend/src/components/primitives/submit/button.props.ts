import { StyleProps } from '../../../styles/style.type';
import React from 'react';

export type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
} & StyleProps;
