import { AuthPB, AuthGRPC } from 'core';
import { PLATFORM_BASE_URL } from 'core/constants';

const { AuthAPIClient } = AuthGRPC;
const { SignUpRequest } = AuthPB;

interface SignUpArgs {
  email: string;
  password: string;
}

type SignUp = ({ email, password }: SignUpArgs) => Promise<AuthPB.SignUpResponse>;

export const signUp: SignUp = ({ email, password }) => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new SignUpRequest();

  request.setEmail(email);
  request.setPassword(password);

  return apiClient.signUp(request, {});
}
