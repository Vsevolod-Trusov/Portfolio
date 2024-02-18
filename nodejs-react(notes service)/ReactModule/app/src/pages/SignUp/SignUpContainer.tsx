import { FC } from 'react';

import { signUp } from 'api/auth';

import SignUp from './SignUp';
import { ISignUpForm } from './types';

const SignUpContainer: FC = () => {
  const mutation = signUp();

  const submit = (values: ISignUpForm): void => {
    mutation.mutate({
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: new Date(values.birthday),
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return <SignUp submit={submit} />;
};

export default SignUpContainer;
