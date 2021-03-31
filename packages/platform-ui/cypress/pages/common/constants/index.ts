import { InvalidUser } from 'pages/common/interfaces/Auth';
import { getUser } from 'pages/auth/utils/getUser';

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

export const EXISTING_USER = getUser('test@mail.com', 'MySecretPassword123');

export const INVALID_USER: InvalidUser = {
  user: {
    email: 'nonexistingemail@mail.com.test',
    firstName: 'John',
    lastName: 'Doe',
    password: 'Password123',
  },
  invalidLoginMessage: 'Incorrect username or password.',
  invalidSignUpMessage: 'There was a problem during the sign up process, please try again',
};
