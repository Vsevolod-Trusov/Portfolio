import styled from 'styled-components';
import { Box } from '@mui/material';

const StyledErrorPage = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '8rem',
});

const StyledWrapper = styled(Box)({
  paddingTop: '0.5rem',
});

export { StyledErrorPage, StyledWrapper };
