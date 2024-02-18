import { Link, Box } from '@mui/material';
import styled from 'styled-components';

import { COLORS } from 'config/colors';
import { logo } from 'assets/images';

const StyledNavbar = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  minWidth: '100%',
  maxHeight: '55px',
  alignSelf: 'center',
});

const StyledNavbarBox = styled(Box)({
  display: 'flex',
  flex: '0.2',
  justifyContent: 'center',
  minWidth: '100%',
  borderRadius: '0.5rem',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
});

const StyledHeaderWrapper = styled(Box)({
  width: '100%',
  backgroundColor: COLORS.MAIN_COLOR_DARK,
  color: COLORS.MAIN_NAVBAR_FONT_COLOR,
  textAlign: 'center',
  background: `url(${logo}) center / auto no-repeat content-box content-box ${COLORS.MAIN_COLOR_DARK}`,
});

const StyledLink = styled(Link)({
  width: '100%',
  padding: '1rem 0',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  border: `1px solid ${COLORS.MAIN_COLOR_DARK}`,
  backgroundColor: COLORS.MAIN_COLOR_DARK,
  '&:hover': {
    backgroundColor: COLORS.MAIN_COLOR_LIGHT,
    transition: '.2s',
  },
  '&:active': {
    backgroundColor: COLORS.HEADER_LINK_ACTIVE,
    transition: '.2s',
  },
  '&.MuiTypography-root': {
    color: COLORS.MAIN_NAVBAR_FONT_COLOR,
  },
});

const StyledSelectedLink = styled(StyledLink)({
  '&.MuiTypography-root': {
    color: `${COLORS.WHITE}`,  },
  backgroundColor: COLORS.MAIN_COLOR_DARK,
  borderBottom: `3px solid ${COLORS.WHITE}`,
  '&:hover': {
    backgroundColor: COLORS.MAIN_COLOR_LIGHT,
    transition: '.2s',
  },
  '&:active': {
    backgroundColor: COLORS.BORDER_COLOR,
    transition: '.2s',
  },
});

export {
  StyledNavbarBox,
  StyledNavbar,
  StyledHeaderWrapper,
  StyledLink,
  StyledSelectedLink,
};
