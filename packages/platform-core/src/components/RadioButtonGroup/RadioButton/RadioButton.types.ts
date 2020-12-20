export type RadioButtonSize = 'sm' | 'md';

export interface RadioButtonProps {
  active?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  name: string;
  onChange: () => void;
  size?: RadioButtonSize;
}
