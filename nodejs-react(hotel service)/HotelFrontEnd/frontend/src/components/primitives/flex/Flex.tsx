import React, { PropsWithChildren } from 'react';
import { getFlexStyledComponent } from './styles';
import { StyleProps } from '../../../styles/style.type';

const StyledFlex = getFlexStyledComponent();

const flexProps = {
  display: 'flex',
  justifyContent: 'center',
  fontFamily: 'Montserrat',
  flexWrap: 'wrap',
};

const Flex = (props: PropsWithChildren<StyleProps>) => {
  return <StyledFlex {...flexProps} {...props} />;
};

export default Flex;
