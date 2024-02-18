import styled from 'styled-components';
import { Box } from '@mui/material';

import { COLORS } from 'config/colors';
import { StyledButton } from 'components/FilterNotes/styled';

import { INotesButton, IStyleNote } from './types';

const StyledNotesLayout = styled(Box)({
  display: 'block',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '0.5rem',
  height: '71vh',
  overflowY: 'scroll',
});

const StyledNote = styled(Box)<IStyleNote>(({ selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  marginTop: '1rem',
  backgroundColor: `${
    selected ? COLORS.MAIN_BUTTON_COLOR : COLORS.FIELD_BACKGROUND_DARK
  }`,
  transform: selected && 'scale(0.985)',
  borderRadius: '2rem',
  transition: 'all .2s',
  color: selected && COLORS.WHITE,
  ':hover': {
    backgroundColor: selected
      ? COLORS.MAIN_BUTTON_COLOR_ACTIVE
      : COLORS.FIELD_BACKGROUND_HOVER,
    transition: '.2s',
  },
  ':active': {
    backgroundColor: selected
      ? COLORS.MAIN_BUTTON_COLOR_ACTIVE
      : COLORS.FIELD_BACKGROUND_HOVER,
    transition: '.2s',
  },
}));

const StyledOutputLine = styled(Box)<INotesButton>(({ selected }) => ({
  color: selected ? COLORS.WHITE : COLORS.SECOND_TEXT_COLOR,
}));

const StyledDescription = styled(StyledOutputLine)({
  fontSize: '1rem',
  fontWeight: '900',
  fontFamily: 'Montserrat-Thin',
});

const StyledLoaderWrapper = styled(Box)({
  display: 'flex',
  minWidth: '90%',
  padding: '1rem',
  justifyContent: 'center',
});

const StyledNotification = styled(Box)({
  textAlign: 'center',
});

const StyledNoteHeader = styled(Box)({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'center',
  gridTemplateRows: '100%',
  minWidth: '100%',
  '&>div:first-child': {
    margin: '0 auto',
  },
  '&>div:last-child': {
    position: 'absolute',
    right: '2%',
  },
});

const StyledNoteBody = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '60% 40%',
  alignItems: 'center',
  justifyItems: 'flex-start',
  placeItems: 'center',
  minWidth: '100%',
  minHeight: '12vh',
  '&>div:last-child': {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '100%',
    margin: '0 auto',
    justifyItems: 'center',
    alignItems: 'center',
    placeItems: 'center',
    button: {
      display: 'flex',
      maxWidth: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '5%',
    },
  },
});

const StyledNotesButton = styled(StyledButton)<INotesButton>(
  ({ selected }) => ({
    '&.MuiButtonBase-root': {
      '&.MuiButton-root': {
        backgroundColor: `${
          selected ? COLORS.MAIN_COLOR_DARK : COLORS.MAIN_BUTTON_COLOR
        }`,
        color: selected && COLORS.WHITE,
        '&:hover': {
          backgroundColor: `${
            selected ? COLORS.MAIN_COLOR_LIGHT : COLORS.MAIN_BUTTON_COLOR_HOVER
          }`,
        },
      },
    },
  }),
);

const StyledNoteLayoutWrapper = styled(Box)({
  overflow: 'hidden',
});

export {
  StyledNotesLayout,
  StyledLoaderWrapper,
  StyledNote,
  StyledOutputLine,
  StyledNotification,
  StyledNoteHeader,
  StyledNoteBody,
  StyledNotesButton,
  StyledDescription,
  StyledNoteLayoutWrapper,
};
