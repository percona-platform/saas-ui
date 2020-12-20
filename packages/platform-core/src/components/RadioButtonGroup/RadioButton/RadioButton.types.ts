import { FieldInputAttrs } from '../../../shared/types';

export type RadioButtonSize = 'sm' | 'md';

export interface RadioButtonProps {
  checked?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  inputProps?: FieldInputAttrs;
  name: string;
  onChange: () => void;
  size?: RadioButtonSize;
}
