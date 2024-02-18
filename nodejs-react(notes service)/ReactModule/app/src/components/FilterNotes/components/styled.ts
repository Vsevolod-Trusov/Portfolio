import { Form } from 'formik';
import styled from 'styled-components';

import { COLORS } from 'config/colors';
import { StyledTextField } from 'components/FilterNotes/styled';

const StyledFilterForm = styled(Form)({
  display: 'grid',
  minWidth: '100%',
  gridTemplateColumns: '2fr 1fr',
  gridTemplateRows: '100%',
  alignItems: 'center',
  gap: '10%',
  padding: '0.5rem',
  marginBottom: '0.5rem',
  borderRadius: '0.5rem',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  backgroundColor: COLORS.FIELD_BACKGROUND,
  margin: '0.4rem 0',
  input: {
    maxHeight: '0.4rem',
  },
  '&>div:first-child': {
    width: '100%',
    margin: '0 auto',
    div: {
      width: '100%',
    },
  },
  '&>div:last-child': {
    display: 'flex',
    minWidth: '100%',
    justifyContent: 'space-around',
  },
});

const StyledFilterInput = styled(StyledTextField)({
  margin: '8px 0',
  padding: '1rem',
  minWidth: '100%',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  backgroundColor: 'transparent',
  fontFamily: 'Montserrat',
  fontSize: '1rem',
  fontWeight: '100',
  letterSpacing: '0.075rem',
  lineHeight: '1.25rem',
});

export { StyledFilterForm, StyledFilterInput };
