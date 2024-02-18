import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import ErrorLine from '../errorLine/ErrorLine';
import { StyleProps } from '../../../styles/style.type';
import Container from '../wrapper/Container';

const StyledSuccessLine = styled(ErrorLine)<StyleProps>((props: any) => ({
  color: props.theme.colors.successColor,
}));

const SuccessLine = (props: PropsWithChildren<StyleProps>) => {
  return (
    <Container backgroundColor={props.backgroundColor}>
      <StyledSuccessLine {...props} />
    </Container>
  );
};

export default SuccessLine;
