import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from 'components';
import { StyledApp, StyledNavbarWrapper, StyledOutlet } from 'templates/styled';

const MainTemplate: FC = () => (
  <StyledApp>
    <StyledNavbarWrapper>
      <Navbar />
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </StyledNavbarWrapper>
  </StyledApp>
);

export default MainTemplate;
