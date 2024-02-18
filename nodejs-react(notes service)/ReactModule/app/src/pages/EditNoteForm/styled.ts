import styled from 'styled-components';
import { Box } from '@mui/material';

import { COLORS } from 'config/colors';

const StyledEditNodeFormWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '98%',
  height: '92vh',
  borderRadius: '0.5rem',
  border: `2px solid ${COLORS.MAIN_COLOR_LIGHT}`,
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  backgroundColor: COLORS.NOTE_BACKGROUND,
});

const StyledEditNodeForm = styled(Box)({
  display: 'block',
  minWidth: '50%',
});

export { StyledEditNodeForm, StyledEditNodeFormWrapper };
