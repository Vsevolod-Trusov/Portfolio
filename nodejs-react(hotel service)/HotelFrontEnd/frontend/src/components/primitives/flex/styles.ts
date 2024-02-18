import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';

const defaultFlex = styled('div')<StyleProps>((props: any) => ({
  display: props.display || 'flex',
  position: props.position,
  justifyContent: props.justifyContent,
  flexDirection: props.flexDirection,
  alignItems: props.alignItems,

  margin: props.margin,

  flex: props.flex,
  flexWrap: props.flexWrap,
  height: props.height,
  minHeight: props.minHeight,
  width: props.width,
  minWidth: props.minWidth,

  fontFamily: props.fontFamily,
  fontSize: props.fontSize,
  fontWeight: props.fontWeight,

  backgroundColor: props.backgroundColor,
  color: props.color,
}));

export const getFlexStyledComponent = () => {
  return defaultFlex;
};

export const getFlexWithHeaderMedia = () => {
  return styled(defaultFlex)<StyleProps>`
    @media ${(props) => props.theme.media.phoneHorizontal} {
      font-size: 5vw;
    }

    @media ${(props) => props.theme.media.minTabletVertical} {
      display: none;
    }
  `;
};
