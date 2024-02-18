export interface ISignUp {
  submit: (values: ISignUpForm) => void;
  handleRefresh?: () => void;
}

export interface IUser {
  firstname: string;
  lastname: string;
  birthday: Date;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpForm {
  firstname: string;
  lastname: string;
  birthday: Date | string;
  email: string;
  password: string;
  confirmPassword: string;
}
