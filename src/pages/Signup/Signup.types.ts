export interface SignUpProps {
  userEmail: string | undefined;
  getSettings: () => void;
}

export interface LoginFormProps {
  getSettings: () => void;
  changeMode: () => void;
}
