import styled from 'styled-components';
import { Box, Button } from '@mui/material';

import { Wrapper } from 'pages/About/styled';
import { COLORS } from 'config/colors';
import { imageBack } from 'assets/images';
import { StyledLink } from 'pages/SignIn/styled';

const ProfileWrapper = styled(Wrapper)({
  margin: '0 auto',
  padding: 0,
  width: '90vw',
  fontSize: '1.2rem',
});

const ProfilePageWrapper = styled(Box)({
  width: '100%',
  height: '90%',
  padding: 0,
});

const ProfilePageContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  gridTemplateRows: '65%',
  width: '100%',
  height: '100%',
  margin: '3rem auto',
  paddingTop: '1rem',
});

const InfoWrapper = styled(Box)({
  display: 'grid',
  gridTemplateRows: '55% 45%',
  alignItems: 'center',
  alignSelf: 'flex-end',
  width: '95%',
  height: '95%',
  gap: '1rem',
  margin: '3rem auto',
  borderRadius: '0.5rem',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  background: COLORS.FIELD_BACKGROUND,
  '&>div:first-child': {
    position: 'relative',
    minHeight: '100%',
    borderRadius: '20px',
    backgroundImage: `url(${imageBack})`,
    backgroundClip: 'border-box',
    backgroundOrigin: 'border-box',
    backgroundRepeat: 'repeat',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
});

const StyledProfileInfoWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1.3fr 2.5fr 1.5fr',
  gridTemplateRows: '100%',
  alignItems: 'center',
  padding: '1.5rem 0 0 0',
  minHeight: '30vh',
  minWidth: '20%',
  '&>div': {
    height: '100%',
  },
});

const StyledProfileInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
  h1: {
    textAlign: 'start',
    fontSize: '2.8rem',
  },
  '&>div': {
    fontFamily: 'Montserrat-Thin',
    fontWeight: '900',
    fontSize: '1.2rem',
    color: COLORS.SECOND_TEXT_COLOR,
    '&>div:last-child': {
      marginTop: '0.5rem',
    },
  },
});

const StyledContainer = styled(Box)({
  position: 'absolute',
  display: 'flex',
  minWidth: '25%',
  justifyContent: 'center',
  alignItems: 'end',
  background: 'transparent',
  bottom: '-45%',
});

const StyledImageWrapper = styled(Box)({
  position: 'relative',
  minWidth: '10vw',
  minHeight: '10vw',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: '0 0.2px',
  position: 'absolute',
  top: 0,
  left: 0,
  border: `5px solid ${COLORS.WHITE}`,
  borderRadius: '50rem',
});

const StyledButton = styled(Button)({
  '&.MuiButtonBase-root': {
    '&.MuiButton-root': {
      display: 'flex',
      minWidth: '23%',
      minHeight: '5%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: '5px',
      borderRadius: '15px',
      background: COLORS.MAIN_BUTTONS_COLOR,
    },
  },
});

const StyledAddingInfoWrapper = styled(Box)({
  display: 'grid',
  gridTemplateRows: '25% 72%',
  gridTemplateColumns: '1fr',
  alignSelf: 'flex-end',
  margin: '3rem auto',
  width: '95%',
  height: '95%',

  '&>div': {
    height: '100%',
    width: '100%',
    padding: '1rem',
    borderRadius: '1rem',
    background: COLORS.FIELD_BACKGROUND,
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    p: {
      fontSize: '1.2rem',
    },
  },
  '&>div:last-child': {
    marginTop: '1rem',
  },
});

const StyledList = styled(Box)({
  marginTop: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  '&>div': {
    display: 'flex',
    gap: '1rem',
    svg: {
      color: COLORS.SECOND_TEXT_COLOR,
    },
    '&>div': {
      alignSelf: 'center',
      fontSize: '1rem',
    },
  },
});

const StyledProfileLink = styled(StyledLink)({
  margin: 0,
  color: COLORS.BLACK,
  fontSize: '1rem',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export {
  ProfileWrapper,
  ProfilePageWrapper,
  StyledProfileInfoWrapper,
  StyledProfileInfo,
  StyledImageWrapper,
  StyledImage,
  InfoWrapper,
  StyledContainer,
  ProfilePageContainer,
  StyledButton,
  StyledAddingInfoWrapper,
  StyledList,
  StyledProfileLink,
};
