import { AuthPB } from 'core';

export type SignIn = ({ email, password }: AuthPB.SignInRequest.AsObject) => Promise<AuthPB.SignInResponse>;

export type SignUp = ({ email, password }: AuthPB.SignUpRequest.AsObject) => Promise<AuthPB.SignUpResponse>;
