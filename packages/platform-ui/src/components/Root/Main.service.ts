import * as apis from 'core/apis';
import { PLATFORM_AUTH_API_BASE_URL } from 'core/constants';

const { AuthPB, AuthGRPC } = apis;
const { AuthAPIClient } = AuthGRPC;
const { RefreshSessionRequest } = AuthPB;

export const refreshSession = () => {
  const apiClient = new AuthAPIClient(PLATFORM_AUTH_API_BASE_URL, null, null);

  const request = new RefreshSessionRequest();

  return apiClient.refreshSession(request, {});
}
