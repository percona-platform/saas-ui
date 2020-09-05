import { Action } from 'redux';
import { AppState } from './store.types';

type AuthState = AppState['auth'];

const DEFAULT_STATE: AuthState = {
  authenticated: false,
  user: undefined,
};

export function authReducer(state: AuthState = DEFAULT_STATE, action: Action<string>): AuthState {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        ...state,
        authenticated: true,
      };
    case 'USER_LOGGED_OUT':
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
}
