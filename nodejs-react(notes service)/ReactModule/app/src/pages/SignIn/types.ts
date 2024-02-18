import { FormikValues } from 'formik';

export interface ICredentials {
  email: string;
  password: string;
}

export interface ISignIn {
  handleSubmit: (values: FormikValues) => Promise<void> | void;
}
