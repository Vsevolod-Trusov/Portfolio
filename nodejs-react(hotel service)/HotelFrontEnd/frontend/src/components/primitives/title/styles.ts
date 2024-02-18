import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';

const defaultTitle = styled('h1')<StyleProps>((props: any) => ({
  fontFamily: props.fontFamily,
  lineHeight: props.lineHeight,
  fontWeight: props.fontWeight,
  fontSize: props.fontSize,
  textAlign: props.textAlign,
  color: props.color || props.theme.colors.fontColor,
}));

export const styles = () => {
  return defaultTitle;
};

export const getTitleWithMedia = () => {
  return styled(defaultTitle)<StyleProps>`
    @media ${(props) => props.theme.media.minTabletVertical} {
      display: none;
    }
  `;
};
