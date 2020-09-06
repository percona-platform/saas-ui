import { createAsyncAction, ActionType, getType } from 'typesafe-actions';
import { AuthState } from '../types';

const DEFAULT_STATE: AuthState = {
  authenticated: false,
  email: undefined,
  pending: false,
};

export const authLoginAction = createAsyncAction(
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_FAILURE',
)<{ email: string; password: string }, undefined, Error>();

export const authSignupAction = createAsyncAction(
  'SIGNUP_USER_REQUEST',
  'SIGNUP_USER_SUCCESS',
  'SIGNUP_USER_FAILURE',
)<{ email: string; password: string }, undefined, Error>();

export const authLogoutAction = createAsyncAction(
  'LOGOUT_USER_REQUEST',
  'LOGOUT_USER_SUCCESS',
  'LOGOUT_USER_FAILURE',
)<{ email: string }, undefined, Error>();

export type AuthActions = ActionType<typeof authLoginAction> | ActionType<typeof authLogoutAction>;

export function authReducer(state: AuthState = DEFAULT_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    // TODO: signup actions
    // Login
    case getType(authLoginAction.request):
      return {
        ...state,
        email: action.payload.email,
        pending: true,
      };
    case getType(authLoginAction.success):
      return {
        ...state,
        authenticated: true,
        pending: false,
      };
    case getType(authLoginAction.failure):
      return {
        ...state,
        authenticated: false,
        email: undefined,
        pending: false,
      };
    // Logout
    case getType(authLogoutAction.request):
      return {
        ...state,
        pending: true,
      };
    case getType(authLogoutAction.success):
      return {
        ...state,
        authenticated: false,
        email: undefined,
        pending: false,
      };
    case getType(authLogoutAction.failure):
      return {
        ...state,
        pending: false,
      };
    default:
      return state;
  }
}
