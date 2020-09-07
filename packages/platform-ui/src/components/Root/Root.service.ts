import * as apis from 'core/apis';
import { PLATFORM_AUTH_API_BASE_URL } from 'core/constants';

const { AuthPB, AuthGRPC } = apis;
const { AuthAPIClient } = AuthGRPC;
const { RefreshSessionRequest } = AuthPB;

type RefreshSession = () => Promise<apis.AuthPB.RefreshSessionResponse>;

export const refreshSession: RefreshSession = () => {
  const apiClient = new AuthAPIClient(PLATFORM_AUTH_API_BASE_URL, null, null);

  const request = new RefreshSessionRequest();

  return apiClient.refreshSession(request, {});
}
