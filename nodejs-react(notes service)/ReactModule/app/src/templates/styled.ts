import { Box } from '@mui/material';
import styled from 'styled-components';

const StyledApp = styled(Box)({
  fontFamily: 'Montserrat',
});

const StyledNavbarWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const StyledOutlet = styled(Box)({
  flex: '0.8',
});

export { StyledApp, StyledNavbarWrapper, StyledOutlet };
