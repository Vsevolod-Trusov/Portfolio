import React, { PropsWithChildren } from 'react';
import { getStyledContainer } from './styles';
import { StyleProps } from '../../../styles/style.type';

const StyledWrapper = getStyledContainer();

const Container = (props: PropsWithChildren<StyleProps>) => {
  return <StyledWrapper {...props} />;
};

export default Container;
