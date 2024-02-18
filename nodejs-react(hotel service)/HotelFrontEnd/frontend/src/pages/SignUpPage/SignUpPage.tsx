import React, { useEffect, useState } from 'react';
import { getStyledSignUpPage } from './styles';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Flex from '../../components/primitives/flex/Flex';
import Form from '../../components/primitives/form/Form';
import Title from '../../components/primitives/title/Title';
import Container from '../../components/primitives/wrapper/Container';
import SignInLogin from '../../components/primitives/input/SignInLogin';
import Submit from '../../components/primitives/submit/Submit';
import SignUpLink from '../../components/primitives/link/SignUpLink';
import ErrorLine from '../../components/primitives/errorLine/ErrorLine';
import Select from '../../components/primitives/select/Select';
import { createUser } from './handlers';

const StyledSighUpPage = getStyledSignUpPage();

const inputProps = {
  outline: 'none',
};

const flexProps = {
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
};

const SIGNUP_MUTATION = gql`
  mutation createUser($user: UserInput!) {
    createUser(createUser: $user) {
      login
    }
  }
`;

const OPTIONS = [
  { value: 'user', label: 'user' },
  { value: 'admin', label: 'admin' },
];

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signIn, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const [login, setLogin] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [errorMessage, setErrorMessage] = useState<string>('');

  inputProps.outline = `1px solid ${errorMessage ? '#da0000' : '#e5e7eb'}`;

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, []);

  if (data) {
    navigate('/HotelFrontEnd/signIn');
  }

  return (
    <StyledSighUpPage>
      <Container>
        <Flex {...flexProps}>
          <Form maxWidth={'400px'}>
            <Title>Sign up your account</Title>
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

              <SignInLogin
                type={'email'}
                name={'email'}
                placeholder={'Enter Email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                {...inputProps}
              />
              <Select
                value={role}
                onChange={setRole}
                options={OPTIONS}
                {...inputProps}
              />
              <Submit
                onClick={() =>
                  createUser(
                    login,
                    password,
                    email,
                    role,
                    setErrorMessage,
                    signIn,
                  )
                }
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </Submit>
              <SignUpLink
                to={'/HotelFrontEnd/signIn'}
                backgroundColor={'inherit'}
              >
                Sign In?
              </SignUpLink>
            </Container>

            {errorMessage ? (
              <ErrorLine backgroundColor={'inherit'}>{errorMessage}</ErrorLine>
            ) : (
              <ErrorLine visibility={'hidden'} backgroundColor={'inherit'}>
                Test Error
              </ErrorLine>
            )}
          </Form>
        </Flex>
      </Container>
    </StyledSighUpPage>
  );
};

export default SignUpPage;
