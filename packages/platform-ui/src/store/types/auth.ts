export interface AuthState {
  authCheckCompleted: boolean;
  authenticated: boolean;
  email?: string;
  pending: boolean;
}

export interface Credentials {
  email: string;
  password?: string;
}
