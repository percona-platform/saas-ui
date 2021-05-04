import { createAsyncAction, ActionType, getType } from 'typesafe-actions';
import { AuthState, LoginPayload, SignupPayload, LogoutPayload, UpdateProfilePayload } from 'store/types';
import * as grpcWeb from 'grpc-web';

const DEFAULT_STATE: AuthState = {
  authenticated: false,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  pending: false,
  authCheckCompleted: false,
};

export const authRefreshAction = createAsyncAction(
  'LOGIN_REFRESH_REQUEST',
  'LOGIN_REFRESH_SUCCESS',
  'LOGIN_REFRESH_FAILURE',
)<undefined, Pick<AuthState, 'email'>, grpcWeb.Error>();

export const authLoginAction = createAsyncAction(
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_FAILURE',
)<LoginPayload, Pick<AuthState, 'email'>, grpcWeb.Error>();

export const authSignupAction = createAsyncAction(
  'SIGNUP_USER_REQUEST',
  'SIGNUP_USER_SUCCESS',
  'SIGNUP_USER_FAILURE',
)<SignupPayload, undefined, grpcWeb.Error>();

export const authLogoutAction = createAsyncAction(
  'LOGOUT_USER_REQUEST',
  'LOGOUT_USER_SUCCESS',
  'LOGOUT_USER_FAILURE',
)<LogoutPayload, undefined, grpcWeb.Error>();

export const authGetProfileAction = createAsyncAction(
  'GET_PROFILE_USER_REQUEST',
  'GET_PROFILE_USER_SUCCESS',
  'GET_PROFILE_USER_FAILURE',
)<undefined, Pick<AuthState, 'email' | 'firstName' | 'lastName'>, grpcWeb.Error>();

export const authUpdateProfileAction = createAsyncAction(
  'UPDATE_PROFILE_USER_REQUEST',
  'UPDATE_PROFILE_USER_SUCCESS',
  'UPDATE_PROFILE_USER_FAILURE',
)<UpdateProfilePayload, undefined, grpcWeb.Error>();

export type AuthActions = (
  ActionType<typeof authRefreshAction>
  | ActionType<typeof authSignupAction>
  | ActionType<typeof authLoginAction>
  | ActionType<typeof authLogoutAction>
  | ActionType<typeof authGetProfileAction>
  | ActionType<typeof authUpdateProfileAction>
);

export function authReducer(state: AuthState = DEFAULT_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    // Refresh Session
    case getType(authRefreshAction.request):
      return {
        ...state,
        pending: true,
        authCheckCompleted: false,
      };
    case getType(authRefreshAction.success):
      return {
        ...state,
        authenticated: true,
        email: action.payload.email,
        pending: false,
        authCheckCompleted: true,
      };
    case getType(authRefreshAction.failure):
      return {
        ...state,
        authenticated: false,
        email: undefined,
        pending: false,
        authCheckCompleted: true,
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
    // Get Profile
    case getType(authGetProfileAction.request):
      return {
        ...state,
        pending: true,
      };
    case getType(authGetProfileAction.success):
      return {
        ...state,
        authenticated: true,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        pending: false,
        authCheckCompleted: true,
      };
    case getType(authGetProfileAction.failure):
      return {
        ...state,
        authenticated: false,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        pending: false,
        authCheckCompleted: true,
      };
    // Update Profile
    case getType(authUpdateProfileAction.request):
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        pending: true,
      };
    case getType(authUpdateProfileAction.success):
      return {
        ...state,
        pending: false,
      };
    case getType(authUpdateProfileAction.failure):
      return {
        ...state,
        pending: false,
      };
    default:
      return state;
  }
}
