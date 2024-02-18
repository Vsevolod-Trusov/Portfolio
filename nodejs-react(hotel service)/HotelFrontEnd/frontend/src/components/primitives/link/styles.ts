import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyleProps } from '../../../styles/style.type';

export const getStyledLink = () => {
  return styled(Link)<StyleProps>((props: any) => ({
    display: props.display,
    margin: props.margin,
    fontSize: props.fontSize,
    lineHeight: props.line,
    textAlign: props.textAlign,
    color: props.color || props.theme.colors.linkColor,
    textDecoration: props.textDecoration,

    ':hover': {
      color: props.theme.colors.linkHover,
    },
  }));
};
