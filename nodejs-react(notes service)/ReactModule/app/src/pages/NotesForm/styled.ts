import styled from 'styled-components';

import { StyledWrapper } from 'pages/SignIn/styled';
import { COLORS } from 'config/colors';

export const StyledFormWrapper = styled(StyledWrapper)({
  justifyContent: 'center',
  alignItems: 'center',
  '&>div': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '98%',
    minHeight: '92vh',
    backgroundColor: COLORS.NOTE_BACKGROUND,
    borderRadius: '0.5rem',
    border: `2px solid ${COLORS.MAIN_COLOR_LIGHT}`,
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '&>form': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: '40vw',
      maxWidth: '40vw',
      minHeight: '50vh',
      maxHeight: '60vh',
      background: 'transparent',
      boxShadow: 'none',
      borderRadius: '2rem',
      border: `2px dashed ${COLORS.BORDER_COLOR}`,
      '&>div': {
        margin: '0 auto',
        width: '50%',
      },
    },
  },
});
