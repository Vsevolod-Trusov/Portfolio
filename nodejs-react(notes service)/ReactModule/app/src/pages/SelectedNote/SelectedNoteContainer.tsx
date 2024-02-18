import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectNote } from 'store/slices/notes.slice';
import { ROUTE } from 'config/constants/routes';
import { editNote } from 'api/notes';

import SelectedNote from './SelectedNote';
import {
  StyledNoteContainerWrapper,
  StyledNotificationSelected,
} from './styled';
import { ISelectedNoteContainer } from './types';
import { SELECT_NOTE } from './constants';

const SelectedNoteContainer: FC<ISelectedNoteContainer> = ({ isShared }) => {
  const selectedNote = useSelector(selectNote);
  const navigate = useNavigate();
  const mutation = editNote(selectedNote.id, isShared);

  const handleNavigateToEdit = () => {
    navigate(isShared ? ROUTE.SHARED_NOTE : ROUTE.MY_NOTE);
  };
  const handleShareNote = () => {
    mutation.mutate({
      isShared: true,
    });
    navigate(ROUTE.NOTES);
  };

  const isNotEmpty = Object.keys(selectedNote).length;

  return isNotEmpty ? (
    <StyledNoteContainerWrapper>
      <SelectedNote
        note={selectedNote}
        handleNavigateToEdit={handleNavigateToEdit}
        handleShareNote={handleShareNote}
      />
    </StyledNoteContainerWrapper>
  ) : (
    <StyledNotificationSelected>{SELECT_NOTE}</StyledNotificationSelected>
  );
};

export default SelectedNoteContainer;
