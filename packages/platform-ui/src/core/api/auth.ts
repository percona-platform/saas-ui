import { AuthPB, AuthGRPC } from 'core';
import { PLATFORM_BASE_URL } from 'core/constants';
import { SignIn, SignUp } from './types';

const { AuthAPIClient } = AuthGRPC;
const {
  RefreshSessionRequest, SignInRequest, SignUpRequest, SignOutRequest,
} = AuthPB;

export const refreshSession = () => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new RefreshSessionRequest();

  return apiClient.refreshSession(request, {});
};

export const signIn: SignIn = ({ email, password }) => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new SignInRequest();

  request.setEmail(email);
  request.setPassword(password);

  return apiClient.signIn(request, {});
};

export const signUp: SignUp = ({ email, firstName = '', lastName = '' }) => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new SignUpRequest();

  request.setEmail(email);
  request.setFirstName(firstName);
  request.setLastName(lastName);
  request.setPassword('');

  return apiClient.signUp(request, {});
};

export const signOut = () => {
  const apiClient = new AuthAPIClient(PLATFORM_BASE_URL, null, null);

  const request = new SignOutRequest();

  return apiClient.signOut(request, {});
};
