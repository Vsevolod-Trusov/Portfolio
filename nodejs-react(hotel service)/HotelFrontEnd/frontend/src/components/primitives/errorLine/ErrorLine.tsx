import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';
import Container from '../wrapper/Container';

const StyledErrorLine = styled('div')<StyleProps>((props: any) => ({
  textAlign: 'center',
  color: props.theme.colors.errorColor,
  marginTop: '0.75rem',
  visibility: props.visibility,
}));

const ErrorLine = (props: PropsWithChildren<StyleProps>) => {
  return (
    <Container backgroundColor={props.backgroundColor}>
      <StyledErrorLine {...props} />
    </Container>
  );
};

export default ErrorLine;
