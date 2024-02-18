import React from 'react';
import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';

const StyledImage = styled('img')<StyleProps>((props: any) => ({
  position: props.position,
  top: props.top,
  left: props.left,
  width: props.width,
  height: props.height,
  objectFit: props.objectFit,
}));

type ImageProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  top?: string;
  left?: string;
};
const Image: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  return <StyledImage src={src} alt={alt} {...props} />;
};

export default Image;
