import { FC } from 'react';
import { Box } from '@mui/material';
import { Formik } from 'formik';

import { Title } from 'components';
import { signUpValidationSchema } from 'validations';
import { SignUpForm, StyledLink, StyledWrapper } from 'pages/SignIn/styled';
import { ROUTE } from 'config/constants/routes';
import {
  EMAIL_FIELD,
  EMAIL_PLACEHOLDER,
  PASSWORD_FIELD,
  PASSWORD_PLACEHOLDER,
} from 'config/globalConstants';
import { StyledButton, StyledTextField } from 'components/FilterNotes/styled';

import {
  BIRTHDAY_FIELD,
  CONFIRM_PASSWORD_FIELD,
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  SIGNUP_VALUES,
  SUBMIT_BUTTON,
  CONFIRM_PASSWORD_PLACEHOLDER,
  FIRSTNAME_PLACEHOLDER,
  LASTNAME_PLACEHOLDER,
  TITLE,
} from './constants';
import { ISignUp, ISignUpForm } from './types';
import { StyledInputsWrapper } from './styled';

const SignUp: FC<ISignUp> = ({ submit }) => (
  <StyledWrapper>
    <Formik
      initialValues={SIGNUP_VALUES}
      validationSchema={signUpValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values: ISignUpForm) => submit(values)}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <SignUpForm onSubmit={handleSubmit}>
          <Title variant={'h1'}>{TITLE}</Title>
          <StyledInputsWrapper>
            <Box>
              <StyledTextField
                id={FIRST_NAME_FIELD}
                name={FIRST_NAME_FIELD}
                placeholder={FIRSTNAME_PLACEHOLDER}
                type={'text'}
                value={values.firstname}
                helperText={touched.firstname && errors?.firstname}
                margin={'normal'}
                fullWidth
                error={touched.firstname && !!errors?.firstname}
                onChange={handleChange}
              />
              <StyledTextField
                id={LAST_NAME_FIELD}
                name={LAST_NAME_FIELD}
                placeholder={LASTNAME_PLACEHOLDER}
                type={'text'}
                value={values.lastname}
                helperText={touched.lastname && errors?.lastname}
                margin={'normal'}
                error={touched.lastname && !!errors?.lastname}
                fullWidth
                onChange={handleChange}
              />
              <StyledTextField
                id={BIRTHDAY_FIELD}
                name={BIRTHDAY_FIELD}
                type={'date'}
                margin={'normal'}
                value={values.birthday}
                helperText={touched.birthday && errors?.birthday}
                error={touched.birthday && !!errors?.birthday}
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Box>
              <StyledTextField
                id={EMAIL_FIELD}
                name={EMAIL_FIELD}
                type={'text'}
                margin={'normal'}
                placeholder={EMAIL_PLACEHOLDER}
                value={values.email}
                helperText={touched.email && errors?.email}
                error={touched.email && !!errors?.email}
                fullWidth
                onChange={handleChange}
              />
              <StyledTextField
                id={PASSWORD_FIELD}
                name={PASSWORD_FIELD}
                placeholder={PASSWORD_PLACEHOLDER}
                type={'password'}
                margin={'normal'}
                value={values.password}
                helperText={touched.password && errors?.password}
                error={touched.password && !!errors?.password}
                fullWidth
                onChange={handleChange}
              />
              <StyledTextField
                id={CONFIRM_PASSWORD_FIELD}
                name={CONFIRM_PASSWORD_FIELD}
                placeholder={CONFIRM_PASSWORD_PLACEHOLDER}
                type={'password'}
                margin={'normal'}
                value={values.confirmPassword}
                helperText={touched.confirmPassword && errors?.confirmPassword}
                error={touched.confirmPassword && !!errors?.confirmPassword}
                fullWidth
                onChange={handleChange}
              />
            </Box>
          </StyledInputsWrapper>
          <Box>
            <StyledButton type='submit' variant={'contained'}>
              {SUBMIT_BUTTON}
            </StyledButton>
          </Box>
          <Box>
            <StyledLink to={ROUTE.SIGN_IN}>Sign in?</StyledLink>
          </Box>
        </SignUpForm>
      )}
    </Formik>
  </StyledWrapper>
);

export default SignUp;
