import styled from 'styled-components';
import { StyleProps } from '../../styles/style.type';

export const getStyledSignUpPage = () => {
  return styled('div')<StyleProps>`
    @media ${(props) => props.theme.media.phoneVertical} {
      border: 1px solid red; //TODO: test style
    }
  `;
};
