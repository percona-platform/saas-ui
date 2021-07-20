/// <reference types="cypress" />
import { InvalidUser } from 'pages/common/interfaces/Auth';
import { getUser } from 'pages/auth/getUser';

// eslint-disable-next-line no-shadow
export enum Pages {
  Login = 'Login',
  SignUp = 'SignUp',
  Profile = 'Profile',
}

export const pageDetailsMap = {
  [Pages.Login]: {
    url: '/login',
  },
  [Pages.SignUp]: {
    url: '/signup',
  },
  [Pages.Profile]: {
    url: '/profile',
  },
};

export const EXISTING_USER = getUser(Cypress.env('PORTAL_USER_EMAIL'), Cypress.env('PORTAL_USER_PASSWORD'));

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

export const MESSAGES = {
  REQUIRED_FIELD: 'Required field',
};
