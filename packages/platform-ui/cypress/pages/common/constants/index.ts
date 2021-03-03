import { InvalidUser, ValidUser } from 'pages/common/interfaces/Auth';

export enum Pages {
  Login = 'Login',
  SignUp = 'SignUp',
}

export const pageDetailsMap = {
  [Pages.Login]: {
    url: '/login',
  },
  [Pages.SignUp]: {
    url: '/signup',
  },
};

export const VALID_USER: ValidUser = {
  user: {
    email: 'test@mail.com',
    password: 'Password123',
  },
  signedInMessage: 'You are signed in as test@mail.com',
  signedUpMessage: 'You have successfully created your credentials',
  loggedOutMessage: 'You are now logged out',
};

export const INVALID_USER: InvalidUser = {
  user: {
    email: 'nonexistingemail@mail.com.test',
    password: 'Password123',
  },
  invalidLoginMessage: 'Incorrect username or password.111',
  invalidSignUpMessage: 'There was a problem during the sign up process, please try again',
};
