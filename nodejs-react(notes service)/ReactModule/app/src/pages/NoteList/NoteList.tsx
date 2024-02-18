import { FC } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { InfinityScroll, FilterNotes } from 'components';

import { TNoteListProps } from './types';
import {
  StyledNoteListWrapper,
  StyledOutletWrapper,
  StyledInfinityScrollWrapper,
  StyledCreateButton,
} from './styled';
import { BUTTON_TEXT } from './constants';

const NoteList: FC<TNoteListProps> = ({
  handleSetSelectedNote,
  handleNavigateToCreate,
}) => (
  <StyledNoteListWrapper>
    <Box>
      <FilterNotes isShared={false} filterByName={false} />
      <FilterNotes isShared={false} filterByName={true} />
      <StyledCreateButton
        type='button'
        variant={'contained'}
        onClick={handleNavigateToCreate}
      >
        {BUTTON_TEXT}
      </StyledCreateButton>
      <StyledInfinityScrollWrapper>
        <InfinityScroll
          isShared={false}
          handleSetSelectedNote={handleSetSelectedNote}
        />
      </StyledInfinityScrollWrapper>
    </Box>
    <StyledOutletWrapper>
      <Outlet />
    </StyledOutletWrapper>
  </StyledNoteListWrapper>
);

export default NoteList;
