import React, { PropsWithChildren } from 'react';
import { getStyledContainerWithMediaFontColor } from './styles';
import { StyleProps } from '../../../styles/style.type';

const ContainerWithThemeColor = getStyledContainerWithMediaFontColor();

const ContainerWithFontColor = (props: PropsWithChildren<StyleProps>) => {
  return <ContainerWithThemeColor {...props} />;
};

export default ContainerWithFontColor;
