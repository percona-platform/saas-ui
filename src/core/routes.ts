import { OKTA_BASE_URL } from 'core/constants';

export const Routes = {
  root: '/',
  ui: '/ui',
  login: '/login',
  logout: '/logout',
  signup: '/signup',
  welcome: '/welcome',
  profile: '/profile',
  editProfile: `https://${OKTA_BASE_URL}/enduser/settings`,
  resetPassword: `https://${OKTA_BASE_URL}/signin/forgot-password`,
};
