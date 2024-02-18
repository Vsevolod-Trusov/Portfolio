import { createGlobalStyle } from 'styled-components';

import MontserratWoff from '../fonts/Montserrat/Montserrat.woff';
import MontserratWoff2 from '../fonts/Montserrat/Montserrat.woff2';

import MontserratThinWoff from '../fonts/Montserrat/Montserrat-Thin.woff';
import MontserratThinWoff2 from '../fonts/Montserrat/Montserrat-Thin.woff2';
import { useSelector } from 'react-redux';

export const globalStyles = () => {
  return createGlobalStyle`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        background: ${(props: any) => props.theme.colors.containerBackground};
      }
      
      @font-face {
          font-family: 'Montserrat';
          src: local('Montserrat'), local('Montserrat-Thin'),
          url(${MontserratWoff2}) format('woff2'),
          url(${MontserratWoff}) format('woff')
      }

      @font-face {
        font-family: 'Montserrat-Thin';
        src: local('Montserrat-Thin'), local('Montserrat-Thin'),
        url(${MontserratThinWoff2}) format('woff2'),
        url(${MontserratThinWoff}) format('woff')
      }
    `;
};
