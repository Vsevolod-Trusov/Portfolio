import { Box } from '@mui/material';
import styled from 'styled-components';

import { COLORS } from 'config/colors';

const StyledNoteContainerWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

const StyledNoteWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  minWidth: '98%',
  minHeight: '92vh',
  backgroundColor: COLORS.NOTE_BACKGROUND,
  borderRadius: '0.5rem',
  border: `2px solid ${COLORS.MAIN_COLOR_LIGHT}`,
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
});

const StyledSelectedNoteWrapper = styled(StyledNoteWrapper)({
  '&>div:first-child': {
    display: 'grid',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '50%',
    maxWidth: '50%',
    minHeight: '40vh',
    maxHeight: '40vh',
    border: `2px dashed ${COLORS.BORDER_COLOR}`,
    borderRadius: '2rem',
    padding: '6px',
    h1: {
      margin: '1rem auto',
    },
    '&>div:not(:last-child)': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

const StyledButtonWrapper = styled(Box)({
  display: 'flex',
  minWidth: '100%',
  justifyContent: 'space-evenly',
});

const StyledSelectedButtonWrapper = styled(StyledButtonWrapper)({
  margin: '2rem 0',
  maxHeight: '2rem',
});

const StyledNotificationSelected = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyleInfoBox = styled(Box)({
  margin: '1rem',
});

export {
  StyledNoteContainerWrapper,
  StyledNoteWrapper,
  StyledButtonWrapper,
  StyledSelectedButtonWrapper,
  StyledNotificationSelected,
  StyledSelectedNoteWrapper,
  StyleInfoBox,
};
