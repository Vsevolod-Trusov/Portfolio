import styled from 'styled-components';
import { Form } from 'formik';

export const StyledForm = styled(Form)({
  alignSelf: 'center',
  margin: '0 auto',
  padding: '1rem',
  minWidth: '20rem',
  minHeight: '17rem',
  borderRadius: '0.5rem',
  boxShadow:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
});
