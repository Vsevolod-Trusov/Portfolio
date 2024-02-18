import React, { PropsWithChildren } from 'react';
import { getStyledContainerWithMediaHeader } from './styles';
import { StyleProps } from '../../../styles/style.type';
const StyledWrapperWithMediaHeader = getStyledContainerWithMediaHeader();

const ContainerWithMediaHeader = (props: PropsWithChildren<StyleProps>) => {
  return <StyledWrapperWithMediaHeader {...props} />;
};

export default ContainerWithMediaHeader;
