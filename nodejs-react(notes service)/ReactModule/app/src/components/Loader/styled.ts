import { Box } from '@mui/material';
import styled from 'styled-components';

import { COLORS } from 'config/colors';

const StyledIndicator = styled(Box)({
  width: '60px',
  height: '30px',
  position: 'relative',
  zIndex: 4,
});

const StyledCircle = styled(Box)({
  width: '8px',
  height: '8px',
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: COLORS.BORDER_COLOR,
  left: '15%',
  transformOrigin: '50%',
  animation: `typing-circle7124 0.5s alternate infinite ease`,
  '&:nth-child(2)': {
    left: '45%',
    animationDelay: '.2s',
  },
  '&:nth-child(3)': {
    left: 'auto',
    right: '15%',
    animationDelay: '.3s',
  },
});

const StyledShadow = styled(Box)({
  width: '5px',
  height: '4px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  position: 'absolute',
  top: '30px',
  transformOrigin: '50%',
  zIndex: 3,
  left: '15%',
  filter: 'blur(1px)',
  animation: `typing-shadow046 0.5s alternate infinite ease`,
  '&:nth-child(4)': {
    left: '45%',
    animationDelay: '.2s',
  },
  '&:nth-child(5)': {
    left: 'auto',
    right: '15%',
    animationDelay: '.3s',
  },
});

export { StyledIndicator, StyledCircle, StyledShadow };
