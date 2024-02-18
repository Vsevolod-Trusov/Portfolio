import { FC } from 'react';
import { Box } from '@mui/material';

import { Title } from 'components';
import { formatDate, sliceText } from 'utils';
import { SHARE } from 'pages/EditNoteForm/constants';
import { SLICE_POSITION } from 'pages/NoteList/constants';
import { StyledButton } from 'components/FilterNotes/styled';

import {
  StyledSelectedButtonWrapper,
  StyledNoteWrapper,
  StyledSelectedNoteWrapper,
  StyleInfoBox,
} from './styled';
import { ISelectedNote } from './types';
import { EDIT, FIELDS, SELECT_NOTE } from './constants';

const SelectedNote: FC<ISelectedNote> = ({
  note,
  handleNavigateToEdit,
  handleShareNote,
}) =>
  note?.title ? (
    <StyledSelectedNoteWrapper>
      <Box>
        <Title variant={'h1'}>{note.title}</Title>
        <StyleInfoBox>
          <Box>{FIELDS.DATE} </Box>
          <Box>{formatDate(new Date(note.dateCreation))}</Box>
        </StyleInfoBox>
        <StyleInfoBox>
          <Box>{FIELDS.TODO}</Box>
          <Box>{sliceText(note.description, SLICE_POSITION)}</Box>
        </StyleInfoBox>
        <StyledSelectedButtonWrapper>
          <StyledButton
            variant='contained'
            type='button'
            onClick={handleNavigateToEdit}
          >
            {EDIT}
          </StyledButton>
          <StyledButton
            variant='contained'
            type='submit'
            onClick={() => handleShareNote()}
          >
            {SHARE}
          </StyledButton>
        </StyledSelectedButtonWrapper>
      </Box>
    </StyledSelectedNoteWrapper>
  ) : (
    <StyledNoteWrapper>{SELECT_NOTE}</StyledNoteWrapper>
  );

export default SelectedNote;
