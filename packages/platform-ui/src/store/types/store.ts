import { RouterState } from 'connected-react-router';
import { AuthState } from './auth';

export interface AppState {
  auth: AuthState;
  router: RouterState;
}
