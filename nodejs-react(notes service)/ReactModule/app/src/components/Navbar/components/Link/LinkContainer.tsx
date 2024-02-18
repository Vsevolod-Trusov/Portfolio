import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { ILinkContainer } from 'components/Navbar/types';
import { ROUTE } from 'config/constants/routes';
import { INITIAL_STATE, INITIAL_USER_STATE } from 'pages/NoteList/constants';
import { setFilter, setSelectedNote } from 'store/slices/notes.slice';
import { setUser } from 'store/slices/user.slice';
import { INITIAL_FILTER } from 'components/FilterNotes/constants';
import { LOCAL_STORAGE_NAMES } from 'config/globalConstants';

import Link from './Link';

const LinkContainer: FC<PropsWithChildren<ILinkContainer>> = ({
  name,
  route,
  children,
  isExit,
  isNoteLink,
  isSelectedNow,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isNoteLink) {
      localStorage.removeItem(LOCAL_STORAGE_NAMES.SELECTED);
      dispatch(setFilter(INITIAL_FILTER));
      dispatch(setSelectedNote(INITIAL_STATE));
    }
    navigate(route ? route : ROUTE.NOT_FOUND);
  };

  const handleExitLinkClick = () => {
    window.localStorage.clear();
    dispatch(setUser(INITIAL_USER_STATE));
    navigate(ROUTE.SIGN_IN);
  };

  return isExit ? (
    <Link isSelectedNow={isSelectedNow} onClick={handleExitLinkClick}>
      <ExitToApp />
    </Link>
  ) : (
    <Link name={name} isSelectedNow={isSelectedNow} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default LinkContainer;
