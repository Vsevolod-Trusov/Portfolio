import React, { PropsWithChildren } from 'react';
import {
  getStyledContainerTablet,
  getStyledContainerWithMediaHeader,
} from './styles';
import { StyleProps } from '../../../styles/style.type';

const StyledContainer = getStyledContainerTablet();

const ContainerImageTablet = (props: PropsWithChildren<StyleProps>) => {
  return <StyledContainer {...props} />;
};

export default ContainerImageTablet;
