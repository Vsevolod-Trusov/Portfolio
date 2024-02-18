import styled from 'styled-components';
import { StyleProps } from '../../../styles/style.type';
import { BurgerProps } from './Burger';

const defaultBurger = styled('button')<StyleProps & BurgerProps>((props) => ({
  position: 'absolute',
  top: '5%',
  left: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '1.25rem',
  height: '1.25rem',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  zIndex: '5',

  ':focus': {
    outline: 'none',
  },

  div: {
    width: '1.25rem',
    height: '0.25rem',
    background: props.theme.colors.burgerLineColor,
    borderRadius: '10px',
    transition: 'all 0.3s linear',
    position: 'relative',
    transformOrigin: '1px',

    ':first-child': {
      transform: props.open ? 'rotate(45deg)' : 'rotate(0)',
    },

    ':nth-child(2)': {
      opacity: props.open ? '0' : '1',
      transform: props.open ? 'translateX(20px)' : 'translateX(0)',
    },

    ':nth-child(3)': {
      transform: props.open ? 'rotate(-45deg)' : 'rotate(0)',
    },
  },
}));

export const getStyledBurger = () => {
  return styled(defaultBurger)<StyleProps>`
    @media ${(props) => props.theme.media.minTabletVertical} {
      display: none;
    }
  `;
};
