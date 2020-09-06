export interface AuthState {
  authenticated: boolean;
  email?: string;
  pending: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}
