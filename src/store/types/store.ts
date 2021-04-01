import { GrafanaTheme } from '@grafana/data';
import { RouterState } from 'connected-react-router';
import { AuthState } from './auth';

export interface AppState {
  auth: AuthState;
  router: RouterState;
  theme: GrafanaTheme;
}
