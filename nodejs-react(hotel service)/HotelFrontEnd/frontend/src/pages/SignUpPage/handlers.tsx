const WRONG_LOGIN = 'Wrong login';
const WRONG_EMAIL = 'Wrong email';

export const createUser = (
  login: string | undefined,
  password: string | undefined,
  email: string | undefined,
  role: string | undefined,
  errorChange: any,
  sendGraphQL: any,
) => {
  if (!login) {
    errorChange(WRONG_LOGIN);
    return;
  }

  const emailRegex: RegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  if (email) {
    if (!emailRegex.test(email)) {
      errorChange(WRONG_EMAIL);
      return;
    }
  } else {
    errorChange(WRONG_EMAIL);
    return;
  }

  sendGraphQL({
    variables: {
      user: { login: login, password: password, email: email, role: role },
    },
  });
};
