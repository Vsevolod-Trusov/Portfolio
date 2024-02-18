import { FC, PropsWithChildren } from 'react';

import { SignUpForm } from 'pages/SignIn/styled';

import { StyledForm } from './styled';
import { IForm } from './types';

const Form: FC<PropsWithChildren<IForm>> = ({ isSignUp, ...props }) => (
  <>
    {isSignUp ? (
      <SignUpForm onSubmit={props.onSubmit}>{props.children}</SignUpForm>
    ) : (
      <StyledForm onSubmit={props.onSubmit}>{props.children}</StyledForm>
    )}
  </>
);

export default Form;
