import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';

export const getSubmit = () => {
  return styled('button')<StyleProps>((props: any) => ({
    display: props.display,
    padding: props.padding,
    margin: props.margin,

    minWidth: props.minWidth,

    borderRadius: props.borderRadius,
    border: props.border,
    backgroundColor:
      props.backgroundColor || props.theme.colors.buttonLoginBackground,

    fontFamily: props.fontFamily,
    fontSize: props.fontSize,
    lineHeight: props.lineHeight,
    fontWeight: props.fontWeight,

    color: props.color,
    textTransform: props.textTransform,

    ':hover': {
      backgroundColor: props.theme.colors.buttonLoginBackgroundHover,
      transition: '.2s',
    },

    ':active': {
      backgroundColor: props.theme.colors.buttonLoginBackgroundActive,
      transition: '.2s',
    },

    ':disabled': {
      backgroundColor: props.theme.colors.buttonDisabled,
      transition: '.2s',
    },
  }));
};
