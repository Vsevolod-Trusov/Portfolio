import { FC } from 'react';
import { TextField } from '@mui/material';

import { StyledButtonWrapper } from 'pages/SelectedNote/styled';
import { Title } from 'components';
import { formatDate } from 'utils';
import { StyledButton } from 'components/FilterNotes/styled';

import {
  EDIT_LABEL,
  EDIT,
  TITLE_LABEL,
  DATE_LABEL,
  DESCRIPTION_LABEL,
} from './constants';
import { IEditNodeForm } from './types';
import { StyledEditNodeForm, StyledEditNodeFormWrapper } from './styled';

const EditNoteForm: FC<IEditNodeForm> = ({
  note,
  description,
  handleSetDescription,
  handleEditNote,
}) => {
  const { title, dateCreation } = note;
  return (
    <StyledEditNodeFormWrapper>
      <Title variant={'h1'}>{EDIT_LABEL}</Title>
      <StyledEditNodeForm>
        <TextField
          label={TITLE_LABEL}
          value={title}
          variant='outlined'
          margin='normal'
          fullWidth
          disabled
        />
        <TextField
          label={DATE_LABEL}
          value={formatDate(new Date(dateCreation))}
          variant='outlined'
          margin='normal'
          fullWidth
          disabled
        />
        <TextField
          label={DESCRIPTION_LABEL}
          value={description}
          name={'nodeText'}
          variant='outlined'
          rows={4}
          margin='normal'
          fullWidth
          multiline
          onChange={handleSetDescription}
        />
        <StyledButtonWrapper>
          <StyledButton
            variant='contained'
            type='submit'
            onClick={handleEditNote}
          >
            {EDIT}
          </StyledButton>
        </StyledButtonWrapper>
      </StyledEditNodeForm>
    </StyledEditNodeFormWrapper>
  );
};

export default EditNoteForm;
