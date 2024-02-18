import React, { useState } from 'react';
import { getStyledPage } from './styles';
import Container from '../../components/primitives/wrapper/Container';
import { saveToken, sendData } from './handlers';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Form from '../../components/primitives/form/Form';
import Title from '../../components/primitives/title/Title';
import SignInLogin from '../../components/primitives/input/SignInLogin';
import Submit from '../../components/primitives/submit/Submit';
import SignUpLink from '../../components/primitives/link/SignUpLink';
import Flex from '../../components/primitives/flex/Flex';
import ErrorLine from '../../components/primitives/errorLine/ErrorLine';

const StyledSignInPage = getStyledPage();

const inputProps = {
  outline: 'none',
};

const flexProps = {
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
};

const LOGIN_MUTATION = gql`
  mutation loginUser($user: UserInput!) {
    loginUser(userInput: $user) {
      accessToken
      login
      email
      subscribedOnNews
    }
  }
`;

const SignInPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [logIn, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    fetchPolicy: 'no-cache',
  });

  inputProps.outline = `1px solid ${error ? '#da0000' : '#e5e7eb'}`;

  if (data) {
    saveToken(
      data.loginUser.accessToken,
      data.loginUser.login,
      data.loginUser.email,
      data.loginUser.subscribedOnNews,
    );
    navigate('/HotelFrontEnd/');
  }

  return (
    <StyledSignInPage>
      <Container>
        <Flex {...flexProps}>
          <Form name={'form'}>
            <Title>Sign in your account</Title>
            <Container backgroundColor={'inherit'}>
              <SignInLogin
                type={'text'}
                name={'login'}
                placeholder={'Enter Login'}
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
                {...inputProps}
              />

              <SignInLogin
                type={'password'}
                name={'password'}
                placeholder={'Enter Password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                {...inputProps}
              />

              <Submit onClick={() => sendData(login, password, logIn)}>
                {loading ? 'Loading...' : 'Sign In'}
              </Submit>

              <SignUpLink
                to={'/HotelFrontEnd/signUp'}
                backgroundColor={'inherit'}
              >
                Sign Up?
              </SignUpLink>
            </Container>

            {error ? (
              <ErrorLine backgroundColor={'inherit'}>{error.message}</ErrorLine>
            ) : (
              <ErrorLine visibility={'hidden'} backgroundColor={'inherit'}>
                Test Error
              </ErrorLine>
            )}
          </Form>
        </Flex>
      </Container>
    </StyledSignInPage>
  );
};

export default SignInPage;
