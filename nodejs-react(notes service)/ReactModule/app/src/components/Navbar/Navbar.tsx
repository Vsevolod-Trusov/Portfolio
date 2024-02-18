import { FC } from 'react';
import {
  LoginSharp,
  HowToRegSharp,
  AccountBox,
  Notes,
  FolderShared,
  DataUsage,
} from '@mui/icons-material';

import { ROUTE_LABELS } from 'config/globalConstants';
import { ROUTE } from 'config/constants/routes';

import LinkContainer from './components/Link/LinkContainer';
import { StyledHeaderWrapper, StyledNavbar } from './styled';
import { INavbar } from './components/types';

const Navbar: FC<INavbar> = ({
  isUserAuthorized,
  isProfile,
  isNotes,
  isShared,
  isAbout,
  isSignIn,
  isSignUp,
}) => (
  <StyledNavbar>
    <StyledHeaderWrapper />
    <LinkContainer
      route={ROUTE.PROFILE}
      isNoteLink={true}
      isSelectedNow={isProfile}
    >
      <AccountBox />
    </LinkContainer>
    <LinkContainer
      route={ROUTE.NOTES}
      isNoteLink={true}
      isSelectedNow={isNotes}
    >
      <Notes />
    </LinkContainer>
    <LinkContainer
      route={ROUTE.SHARED}
      isNoteLink={true}
      isSelectedNow={isShared}
    >
      <FolderShared />
    </LinkContainer>
    <LinkContainer route={ROUTE.ABOUT} isSelectedNow={isAbout}>
      <DataUsage />
    </LinkContainer>

    {isUserAuthorized ? (
      <LinkContainer name={ROUTE_LABELS.EXIT} isExit={true} />
    ) : (
      <>
        <LinkContainer route={ROUTE.SIGN_IN} isSelectedNow={isSignIn}>
          <LoginSharp />
        </LinkContainer>
        <LinkContainer route={ROUTE.SIGN_UP} isSelectedNow={isSignUp}>
          <HowToRegSharp />
        </LinkContainer>
      </>
    )}
  </StyledNavbar>
);

export default Navbar;
