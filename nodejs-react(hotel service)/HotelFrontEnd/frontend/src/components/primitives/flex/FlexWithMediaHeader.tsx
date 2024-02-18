import React, { PropsWithChildren } from 'react';
import { StyleProps } from '../../../styles/style.type';
import { getFlexWithHeaderMedia } from './styles';

const StyledFlexMedia = getFlexWithHeaderMedia();

const flexProps = {
  display: 'flex',
  justifyContent: 'center',
  fontFamily: 'Montserrat',
};

const FlexWithMediaHeader = (props: PropsWithChildren<StyleProps>) => {
  return <StyledFlexMedia {...flexProps} {...props} />;
};

export default FlexWithMediaHeader;
