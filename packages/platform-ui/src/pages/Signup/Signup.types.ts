export interface Credentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface SignUpProps {
  userEmail: string | undefined;
  getSettings: () => void;
}

export interface LoginFormProps {
  getSettings: () => void;
  changeMode: () => void;
}
