export interface User {
  email: string;
  password: string;
}

export type ValidUser = {
  user: User;
  signedInMessage: string;
  signedUpMessage: string;
  loggedOutMessage: string;
}

export type InvalidUser = {
  user: User;
  invalidLoginMessage: string;
  invalidSignUpMessage: string;
}
