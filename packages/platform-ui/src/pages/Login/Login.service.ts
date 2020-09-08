import * as apis from 'core/apis';
import { PLATFORM_AUTH_API_BASE_URL } from 'core/constants';

const { AuthPB, AuthGRPC } = apis;
const { AuthAPIClient } = AuthGRPC;
const { SignInRequest } = AuthPB;

interface SignInArgs {
  email: string;
  password: string;
}

type SignIn = ({ email, password }: SignInArgs) => Promise<apis.AuthPB.SignInResponse>;

export const signIn: SignIn = ({ email, password }) => {
  const apiClient = new AuthAPIClient(PLATFORM_AUTH_API_BASE_URL, null, null);

  const request = new SignInRequest();

  request.setEmail(email);
  request.setPassword(password);

  return apiClient.signIn(request, {});
}
