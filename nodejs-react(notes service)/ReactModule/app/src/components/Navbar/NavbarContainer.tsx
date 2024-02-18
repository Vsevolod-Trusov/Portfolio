import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import { ROUTE } from 'config/constants/routes';
import { selectFirstName } from 'store/slices/user.slice';

import { StyledNavbarBox } from './styled';
import Navbar from './Navbar';

const NavbarContainer: FC = () => {
  const isUserAuthorized = useSelector(selectFirstName);
  const isProfile = !!useMatch(ROUTE.PROFILE);
  const isNotes = !!useMatch(ROUTE.NOTES);
  const isMyNotes = !!useMatch(ROUTE.SELECTED_NOTE);
  const isMyCreate = !!useMatch(ROUTE.NOTES_FORM);
  const isMyEdit = !!useMatch(ROUTE.MY_NOTE);
  const isShared = !!useMatch(ROUTE.SHARED);
  const isSharedNote = !!useMatch(ROUTE.SELECTED_SHARE);
  const isSharedCreate = !!useMatch(ROUTE.SHARED_FORM);
  const isSharedEdit = !!useMatch(ROUTE.SHARED_NOTE);
  const isAbout = !!useMatch(ROUTE.ABOUT);
  const isSignIn = !!useMatch(ROUTE.SIGN_IN);
  const isSignUp = !!useMatch(ROUTE.SIGN_UP);

  return (
    <StyledNavbarBox>
      <Navbar
        isUserAuthorized={isUserAuthorized}
        isProfile={isProfile}
        isNotes={isNotes || isMyNotes || isMyCreate || isMyEdit}
        isShared={isShared || isSharedNote || isSharedCreate || isSharedEdit}
        isAbout={isAbout}
        isSignIn={isSignIn}
        isSignUp={isSignUp}
      />
    </StyledNavbarBox>
  );
};

export default NavbarContainer;
