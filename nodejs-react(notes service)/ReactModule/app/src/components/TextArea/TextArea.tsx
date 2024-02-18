import { FC } from 'react';
import { FieldAttributes } from 'formik/dist/Field';
import { TextFieldProps } from '@mui/material';

import { StyledTextAreaField } from './styled';

const TextArea: FC<FieldAttributes<TextFieldProps>> = ({
  name,
  value,
  placeholder,
  helperText,
  error,
  onChange,
}) => (
  <>
    <StyledTextAreaField
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      helperText={helperText}
      variant='outlined'
      margin='normal'
      rows={4}
      error={error}
      fullWidth
      multiline
      onChange={onChange}
    />
  </>
);

export default TextArea;
