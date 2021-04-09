export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type ValidUser = {
  user: User;
  signedInMessage: string;
  activationEmailSentMessage: string;
  loggedOutMessage: string;
}

export type InvalidUser = {
  user: User;
  invalidLoginMessage: string;
  invalidSignUpMessage: string;
}
