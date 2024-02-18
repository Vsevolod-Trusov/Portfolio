import React, { PropsWithChildren } from 'react';
import { StyleProps } from '../../../styles/style.type';
import { titleProps } from './Title';
import { getTitleWithMedia } from './styles';

const StyledTitleWithMedia = getTitleWithMedia();

const TitleWithMediaMain = (props: PropsWithChildren<StyleProps>) => {
  return <StyledTitleWithMedia {...titleProps} {...props} />;
};

export default TitleWithMediaMain;
