import { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTE } from 'config/constants/routes';
import { selectFirstName } from 'store/slices/user.slice';
import { setSelectedNote } from 'store/slices/notes.slice';
import { LOCAL_STORAGE_NAMES } from 'config/globalConstants';

import { TNote } from './types';
import NoteList from './NoteList';

const NoteListContainer: FC = () => {
  const firstname = useSelector(selectFirstName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(
    window.localStorage.getItem(LOCAL_STORAGE_NAMES.USER),
  );

  if (!user || !firstname) {
    return <Navigate to={ROUTE.SIGN_IN} />;
  }
  const handleSelectNode = (item: TNote) => {
    window.localStorage.setItem(
      LOCAL_STORAGE_NAMES.SELECTED,
      JSON.stringify(item),
    );
    dispatch(setSelectedNote(item));
    navigate(ROUTE.SELECTED_NOTE);
  };

  const handleNavigateToCreate = () => {
    navigate(ROUTE.NOTES_FORM);
  };

  return (
    <NoteList
      handleSetSelectedNote={handleSelectNode}
      handleNavigateToCreate={handleNavigateToCreate}
    />
  );
};

export default NoteListContainer;
