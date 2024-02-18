import React, { PropsWithChildren } from 'react';
import { getStyledBurger } from './Burger.style';

const StyledBurger = getStyledBurger();

export type BurgerProps = {
  open?: boolean;
  setOpen?: any;
};

const Burger: React.FC<PropsWithChildren<BurgerProps>> = ({
  open,
  setOpen,
}) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
