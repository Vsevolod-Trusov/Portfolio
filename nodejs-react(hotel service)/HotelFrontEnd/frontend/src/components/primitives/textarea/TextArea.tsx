import React, { PropsWithChildren } from 'react';
import { inputProps } from '../input/SignInLogin';
import { TextAreaProps } from './textarea.props';
import { StyledTextArea } from './styled';

const TextArea = (props: PropsWithChildren<TextAreaProps>) => {
  return <StyledTextArea {...inputProps} {...props} />;
};

export default TextArea;
