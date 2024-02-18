import { StyleProps } from '../../../styles/style.type';
import React from 'react';

export type InputProps = {
  min?: string;
  max?: string;
  name?: string;
  type?: string;
  value?: string | undefined;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & StyleProps;
