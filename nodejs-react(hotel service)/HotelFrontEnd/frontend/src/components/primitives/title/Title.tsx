import React, { PropsWithChildren } from 'react';
import { styles } from './styles';
import { StyleProps } from '../../../styles/style.type';

const StyledTitle = styles();

export const titleProps = {
  fontFamily: 'Montserrat-Thin',
  fontSize: '1.55rem',
  lineHeight: '1.75rem',
  fontWeight: '600',
  textAlign: 'center',
};

const Title = (props: PropsWithChildren<StyleProps>) => {
  return <StyledTitle {...titleProps} {...props} />;
};

export default Title;
