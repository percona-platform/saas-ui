export interface AuthState {
  authenticated: boolean;
  email?: string;
  pending: boolean;
  authCheckCompleted: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}
