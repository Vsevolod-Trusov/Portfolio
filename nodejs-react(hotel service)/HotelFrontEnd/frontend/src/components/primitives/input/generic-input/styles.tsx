import styled from 'styled-components';
import { StyleProps } from '../../../../styles/style.type';

export const getStyledInput = () => {
  return styled('input')<StyleProps>((props: any) => ({
    padding: props.padding,
    margin: props.margin,

    minWidth: props.minWidth,

    border: props.border || `1px solid ${props.theme.colors.borderLoginInput}`,
    borderRadius: props.borderRadius,

    backgroundColor:
      props.backgroundColor || props.theme.colors.loginInputBackground,
    boxShadow: props.boxShadow,

    fontFamily: props.fontFamily,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    color: props.color || props.theme.colors.fontColor,

    letterSpacing: props.letterSpacing,
    lineHeight: props.lineHeight,

    ':focus': {
      outline: `1px solid ${props.theme.colors.borderFocused}`,
      transition: '.1s',
    },

    '::placeholder': {
      color: props.theme.colors.placeholderColor,
    },
  }));
};
