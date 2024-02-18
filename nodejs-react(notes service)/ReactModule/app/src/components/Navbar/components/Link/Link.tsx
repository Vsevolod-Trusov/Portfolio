import { FC, PropsWithChildren } from 'react';

import { StyledLink, StyledSelectedLink } from 'components/Navbar/styled';

import { TLinkProps } from './types';

const Link: FC<PropsWithChildren<TLinkProps>> = ({
  name,
  onClick,
  children,
  isSelectedNow,
}) => (
  <>
    {isSelectedNow ? (
      <StyledSelectedLink
        variant={'button'}
        underline={'none'}
        onClick={onClick}
      >
        {name || children}
      </StyledSelectedLink>
    ) : (
      <StyledLink variant={'button'} underline={'none'} onClick={onClick}>
        {name || children}
      </StyledLink>
    )}
  </>
);

export default Link;
