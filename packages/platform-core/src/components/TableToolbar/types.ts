import { AvailableIcons } from 'components/Icon';

export interface Action {
  callback: () => {};
  icon: AvailableIcons;
  label: string;
  minItems?: number;
  maxItems?: number;
}

export interface TableToolbarProps {
  actions: Action[];
  selectedItems: any[];
}

export interface TableToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: AvailableIcons;
  label: string;
  enabled?: boolean;
}
