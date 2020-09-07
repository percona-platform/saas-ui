import { createAsyncAction, ActionType, getType } from 'typesafe-actions';
import { AuthState } from '../types';

const DEFAULT_STATE: AuthState = {
  authenticated: false,
  email: undefined,
  pending: false,
};

export const authRefreshAction = createAsyncAction(
  'LOGIN_REFRESH_REQUEST',
  'LOGIN_REFRESH_SUCCESS',
  'LOGIN_REFRESH_FAILURE',
)<undefined, undefined, Error>();

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

export type AuthActions = ActionType<typeof authRefreshAction> | ActionType<typeof authSignupAction> | ActionType<typeof authLoginAction> | ActionType<typeof authLogoutAction>;

export function authReducer(state: AuthState = DEFAULT_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    // Refresh
    case getType(authRefreshAction.request):
      return {
        ...state,
        pending: true,
      };
    case getType(authRefreshAction.success):
      return {
        ...state,
        authenticated: true,
        pending: false,
      };
    case getType(authRefreshAction.failure):
      return {
        ...state,
        authenticated: false,
        email: undefined,
        pending: false,
      };
    // Signup
    case getType(authSignupAction.request):
      return {
        ...state,
        email: action.payload.email,
        pending: true,
      };
    case getType(authSignupAction.success):
      return {
        ...state,
        pending: false,
      };
    case getType(authSignupAction.failure):
      return {
        ...state,
        email: undefined,
        pending: false,
      };
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
