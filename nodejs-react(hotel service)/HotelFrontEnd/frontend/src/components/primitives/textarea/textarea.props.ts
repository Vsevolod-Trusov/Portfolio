import { StyleProps } from '../../../styles/style.type';
import React from 'react';

export type TextAreaProps = {
  name?: string;
  type?: string;
  value?: string | undefined;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & StyleProps;
