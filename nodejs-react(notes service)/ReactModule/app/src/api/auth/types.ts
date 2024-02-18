export type TUser = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  password: string;
};

export type TUserParameters = {
  email: string;
  password: string;
};

export interface ISignUpResponse {
  user: TUser;
  email: string;
  password: string;
}
