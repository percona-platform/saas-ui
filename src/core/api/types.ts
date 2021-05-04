import { AuthPB } from 'core';

export type SignIn = ({ email, password }: AuthPB.SignInRequest.AsObject) => Promise<AuthPB.SignInResponse>;

export type SignUp = ({ email, firstName, lastName, password }: AuthPB.SignUpRequest.AsObject) =>
  Promise<AuthPB.SignUpResponse>;

export type UpdateProfile = ({ firstName, lastName }: AuthPB.UpdateProfileRequest.AsObject) =>
  Promise<AuthPB.UpdateProfileResponse>;
