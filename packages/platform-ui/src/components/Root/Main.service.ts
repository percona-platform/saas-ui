import { AuthPB, AuthGRPC } from 'core';
import { PLATFORM_BASE_URL } from 'core/constants';

const { AuthAPIClient } = AuthGRPC;
const { RefreshSessionRequest } = AuthPB;

export const refreshSession = () => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new RefreshSessionRequest();

  return apiClient.refreshSession(request, {});
}
