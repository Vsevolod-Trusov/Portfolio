import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';

const defaultContainer = styled('div')<StyleProps>((props: any) => ({
  display: props.display,
  position: props.position || props.theme.position,
  padding: props.padding || props.theme.container.padding,
  flex: props.flex,
  alignSelf: props.alignSelf,
  margin: props.margin,

  maxWidth: props.maxWidth,
  width: props.width,
  height: props.height,
  fontFamily: props.fontFamily,
  fontSize: props.fontSize,

  textAlign: props.textAlign,
  color: props.color,

  backgroundColor: props.backgroundColor
    ? props.backgroundColor
    : props.theme.colors.containerBackground,
}));

export const getStyledContainer = () => {
  return defaultContainer;
};

const containerWithMedia = styled(defaultContainer)<StyleProps>`
  @media ${(props) => props.theme.media.minTabletVertical} {
    display: none;
  }
`;

export const getStyledContainerWithMediaHeader = () => {
  return containerWithMedia;
};

export const getStyledContainerTablet = () => {
  return styled(containerWithMedia)<StyleProps>`
    @media ${(props) => props.theme.media.phoneHorizontal} {
      display: none;
    }
    @media ${(props) => props.theme.media.minTabletVertical} {
      display: block;
    }
  `;
};

export const getStyledContainerWithMediaFontColor = () => {
  return styled(defaultContainer)<StyleProps>((props) => ({
    color: props.color || props.theme.colors.fontColor,
    background: props.theme.colors.backgroundColor,
  }));
};
