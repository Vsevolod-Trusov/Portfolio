import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

import { StyledFormControl } from 'components/FormControlLayout/styled';
import { COLORS } from 'config/colors';

const StyledFormControlLayout = styled(StyledFormControl)({
  display: 'flex',
  alignSelf: 'center',
  justifyContent: 'space-evenly',
});

const StyledTextField = styled(TextField)({
  margin: '8px 0',
  padding: '1rem',
  minWidth: '100%',
  border: '1px solid black',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  backgroundColor: 'transparent',
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '100',
  letterSpacing: '0.075rem',
  lineHeight: '1.25rem',
});

const StyledButton = styled(Button)({
  '&.MuiButtonBase-root': {
    '&.MuiButton-root': {
      color: COLORS.WHITE,
      backgroundColor: COLORS.MAIN_BUTTON_COLOR,
      '&:hover': {
        backgroundColor: COLORS.MAIN_BUTTON_COLOR_HOVER,
        transition: '.2s',
      },
      '&:active': {
        backgroundColor: COLORS.MAIN_BUTTON_COLOR_ACTIVE,
        transition: '.2s',
      },
    },
  },
});

export { StyledFormControlLayout, StyledTextField, StyledButton };
