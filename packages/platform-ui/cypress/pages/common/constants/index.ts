import {TValidUser} from "../interfaces/ICommon";

export enum Pages {
  Login = "Login",
  SignUp = "SignUp",
}

export const pageDetailsMap = {
  [Pages.Login]: {
    url: '/login',
  },
  [Pages.SignUp]: {
    url: '/signup',
  },
};

export const VALID_USER: TValidUser = {
  user: {
    email: 'test@mail.com',
    password: 'Password123',
  },
  signedInMessage: 'You are signed in as test@mail.com',
  signedUpMessage: 'You have successfully created your credentials',
};
