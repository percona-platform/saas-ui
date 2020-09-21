import { AuthPB, AuthGRPC } from 'core';
import { PLATFORM_BASE_URL } from 'core/constants';

const { AuthAPIClient } = AuthGRPC;
const { SignOutRequest } = AuthPB;

export const signOut = () => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new SignOutRequest();

  return apiClient.signOut(request, {});
}
