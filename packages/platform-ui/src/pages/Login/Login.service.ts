import { AuthPB, AuthGRPC } from 'core';
import { PLATFORM_BASE_URL } from 'core/constants';

const { AuthAPIClient } = AuthGRPC;
const { SignInRequest } = AuthPB;

interface SignInArgs {
  email: string;
  password: string;
}

type SignIn = ({ email, password }: SignInArgs) => Promise<AuthPB.SignInResponse>;

export const signIn: SignIn = ({ email, password }) => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new SignInRequest();

  request.setEmail(email);
  request.setPassword(password);

  return apiClient.signIn(request, {});
}
