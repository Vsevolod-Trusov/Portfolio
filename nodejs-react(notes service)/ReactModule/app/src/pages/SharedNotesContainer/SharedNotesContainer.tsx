import { FC } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { InfinityScroll, FilterNotes } from 'components';
import { ROUTE } from 'config/constants/routes';
import { selectFirstName } from 'store/slices/user.slice';
import { setSelectedNote } from 'store/slices/notes.slice';
import { LOCAL_STORAGE_NAMES } from 'config/globalConstants';
import {
  StyledCreateButton,
  StyledInfinityScrollWrapper,
  StyledNoteListWrapper,
  StyledOutletWrapper,
} from 'pages/NoteList/styled';
import { TNote } from 'pages/NoteList/types';
import { BUTTON_TEXT } from 'pages/NoteList/constants';

const SharedNotesContainer: FC = () => {
  const firstname = useSelector(selectFirstName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNotUserAuthorized =
    !JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAMES.EMAIL)) &&
    !firstname;

  const handleSelectNode = (item: TNote) => {
    window.localStorage.setItem(
      LOCAL_STORAGE_NAMES.SELECTED,
      JSON.stringify(item),
    );
    dispatch(setSelectedNote(item));
    navigate(ROUTE.SELECTED_SHARE);
  };

  const handleNavigateToCreate = () => {
    navigate(ROUTE.SHARED_FORM);
  };

  return !isNotUserAuthorized ? (
    <StyledNoteListWrapper>
      <Box>
        <FilterNotes isShared={true} />
        <FilterNotes isShared={true} filterByName={true} />
        <StyledCreateButton
          type='button'
          variant={'contained'}
          onClick={handleNavigateToCreate}
        >
          {BUTTON_TEXT}
        </StyledCreateButton>
        <StyledInfinityScrollWrapper>
          <InfinityScroll
            isShared={true}
            handleSetSelectedNote={handleSelectNode}
          />
        </StyledInfinityScrollWrapper>
      </Box>
      <StyledOutletWrapper>
        <Outlet />
      </StyledOutletWrapper>
    </StyledNoteListWrapper>
  ) : (
    <Navigate to={ROUTE.SIGN_IN} />
  );
};

export default SharedNotesContainer;
