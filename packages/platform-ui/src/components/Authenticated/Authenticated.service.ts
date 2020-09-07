import * as apis from 'core/apis';
import { PLATFORM_AUTH_API_BASE_URL } from 'core/constants';

const { AuthPB, AuthGRPC } = apis;
const { AuthAPIClient } = AuthGRPC;
const { SignOutRequest } = AuthPB;

type SignOut = () => Promise<apis.AuthPB.SignOutResponse>;

export const signOut: SignOut = () => {
  const apiClient = new AuthAPIClient(PLATFORM_AUTH_API_BASE_URL, null, null);

  const request = new SignOutRequest();

  return apiClient.signOut(request, {});
}
