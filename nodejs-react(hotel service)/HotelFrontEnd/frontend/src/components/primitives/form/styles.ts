import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';

export const getStyledForm = () => {
  return styled('div')<StyleProps>((props: any) => ({
    margin: props.margin,
    display: props.display,
    padding: props.padding,
    maxWidth: props.maxWidth,
    minWidth: props.minWidth,
    borderRadius: props.borderRadius,
    boxShadow: props.boxShadow,
    backgroundColor:
      props.backgroundColor || props.theme.colors.formBackgroundColor,
  }));
};
