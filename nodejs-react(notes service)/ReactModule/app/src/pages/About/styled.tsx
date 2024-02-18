import styled from 'styled-components';
import { Box } from '@mui/material';

import { COLORS } from 'config/colors';

const Wrapper = styled(Box)({
  height: '100vh',
});

const AboutWrapper = styled(Box)({
  alignSelf: 'center',
  margin: '0 auto',
  padding: '1rem',
  width: '90%',
  height: '100%',
  borderRadius: '0.5rem',
  background: 'transparent',
});

const AboutContainer = styled(Box)({
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateRows: '1fr 3fr',
  gridTemplateColumns: '1fr',
  gap: '1%',
});

const StyledHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  minHeight: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10%',
  h1: {
    fontSize: '2rem',
  },
  h2: {
    fontSize: '1.5rem',
    color: COLORS.SECOND_TEXT_COLOR,
  },
});

const StyledInfoWrapper = styled(Box)({
  display: 'flex',
  minWidth: '100%',
  justifyContent: 'center',
  gap: '20%',
  ul: {
    width: '25%',
    li: {
      display: 'flex',
      minWidth: '40%',
      gap: '5%',
      border: `1px solid ${COLORS.ITEMS_BORDER_COLOR}`,
      borderRadius: '0.8rem',
      '&>div:first-child': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `1px solid ${COLORS.ITEMS_BORDER_COLOR}`,
        borderRadius: '0.2rem',
      },
    },
    'li:not(:last-child)': {
      marginBottom: '0.5rem',
    },
  },
});

export {
  AboutWrapper,
  Wrapper,
  AboutContainer,
  StyledHeader,
  StyledInfoWrapper,
};
