import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';
import { BurgerProps } from './Burger';

const defaultMenu = styled('nav')<StyleProps & BurgerProps>((props: any) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: props.theme.colors.containerBackground,
  height: '100vh',
  padding: '2rem',
  position: 'absolute',
  top: '0',
  left: '0',
  transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
  transition: '.2s',
  zIndex: '4',

  a: {
    fontSize: '2rem',
    fontFamily: 'Montserrat-Thin',
    textTransform: 'uppercase',
    padding: '1rem 0',
    fontWeight: 'bold',
    letterSpacing: '0.5rem',
    color: props.theme.colors.fontColor,
    textDecoration: 'none',
    transition: 'color 0.3s linear',

    '@media (max-width: 767px)': {
      fontSize: '1.5rem',
      textAlign: 'center',
    },
  },
}));

export const getStyledMenu = () => {
  return styled(defaultMenu)<StyleProps>`
    @media ${(props) => props.theme.media.phoneHorizontal} {
      width: 100%;
      height: 120%;
      font-size: 1.5rem;
      text-align: center;
    }
    @media ${(props) => props.theme.media.minTabletVertical} {
      display: none;
    }
  `;
};
