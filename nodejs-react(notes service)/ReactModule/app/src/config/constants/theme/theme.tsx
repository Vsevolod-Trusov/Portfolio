import { createTheme } from '@mui/material';

import { COLORS } from 'config/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontFamily: 'Montserrat',
            fontSize: '1.55rem',
            lineHeight: '1.75rem',
            textAlign: 'center',
          },
        },
      ],
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            fontFamily: 'Montserrat',
            fontSize: '1.55rem',
            lineHeight: '1.75rem',
            fieldset: {
              borderColor: `${COLORS.BORDER_COLOR} !important`,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
          fontSize: '1.55rem',
          lineHeight: '1.75rem',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: COLORS.BORDER_COLOR,
        },
      },
    },
  },
});

export default theme;
