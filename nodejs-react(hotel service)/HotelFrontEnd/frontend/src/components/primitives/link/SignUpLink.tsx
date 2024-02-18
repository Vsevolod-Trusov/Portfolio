import React, { PropsWithChildren } from 'react';
import { StyleProps } from '../../../styles/style.type';
import Container from '../wrapper/Container';
import { LinkProps } from 'react-router-dom';
import { getStyledLink } from './styles';

const StyledLink = getStyledLink();

const linkProps = {
  display: 'block',
  margin: '0.75rem 0 0 0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  textAlign: 'center',
};

const SignUpLink = (props: PropsWithChildren<LinkProps & StyleProps>) => {
  return (
    <Container padding={props.padding} backgroundColor={props.backgroundColor}>
      <StyledLink {...linkProps} {...props}>
        {props.children}
      </StyledLink>
    </Container>
  );
};

export default SignUpLink;
