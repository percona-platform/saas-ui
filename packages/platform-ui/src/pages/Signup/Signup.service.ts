import { apis } from '@percona/platform-core';
import { PLATFORM_AUTH_API_BASE_URL } from 'core';

const { AuthPB, AuthGRPC } = apis;
const { AuthAPIClient } = AuthGRPC;
const { SignUpRequest } = AuthPB;

interface SignUpArgs {
  email: string;
  password: string;
}

type SignUp = ({ email, password }: SignUpArgs) => Promise<apis.AuthPB.SignUpResponse>;

export const signUp: SignUp = ({ email, password }) => {
  const apiClient = new AuthAPIClient(PLATFORM_AUTH_API_BASE_URL, null, null);

  const request = new SignUpRequest();

  request.setEmail(email);
  request.setPassword(password);

  return apiClient.signUp(request, {});
}
