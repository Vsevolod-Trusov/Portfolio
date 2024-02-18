import styled from 'styled-components';

export const getStyledPage = () => {
  return styled.div`
    @media ${(props) => props.theme.media.phoneVertical} {
      border: 1px solid red; //TODO: test style
    }
  `;
};
