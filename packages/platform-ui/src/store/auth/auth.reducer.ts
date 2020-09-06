import { createAsyncAction, ActionType, getType } from 'typesafe-actions';
import { AuthState } from '../types';

const DEFAULT_STATE: AuthState = {
  authenticated: true,
  email: 'alex@tymchuk.org',
  pending: false,
};

export const authLoginAction = createAsyncAction(
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_FAILURE',
)<{ email: string; password: string }, undefined, Error>();

export const authLogoutAction = createAsyncAction(
  'LOGOUT_USER_REQUEST',
  'LOGOUT_USER_SUCCESS',
  'LOGOUT_USER_FAILURE',
)<{ email: string }, undefined, Error>();

export type AuthActions = ActionType<typeof authLoginAction> | ActionType<typeof authLogoutAction>;

export function authReducer(state: AuthState = DEFAULT_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    // TODO: add logout & signup actions
    case getType(authLoginAction.request):
      return {
        ...state,
        email: action.payload.email,
        pending: false,
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
    default:
      return state;
  }
}
