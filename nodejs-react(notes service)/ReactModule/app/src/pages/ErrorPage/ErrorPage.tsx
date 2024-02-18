import { FC } from 'react';
import { Button } from '@mui/material';

import { IErrorPage } from './types';
import { StyledErrorPage, StyledWrapper } from './styled';
import { BACK_BUTTON_NAME, ERROR_TEXT, HEADER } from './constants';

export const ErrorPage: FC<IErrorPage> = ({ handleBack }) => (
  <StyledErrorPage>
    <StyledWrapper>{HEADER}</StyledWrapper>
    <StyledWrapper>{ERROR_TEXT}</StyledWrapper>
    <StyledWrapper>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        onClick={handleBack}
      >
        {BACK_BUTTON_NAME}
      </Button>
    </StyledWrapper>
  </StyledErrorPage>
);
