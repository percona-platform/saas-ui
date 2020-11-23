import { AvailableIcons } from 'components/Icon';

export interface Action {
  callback: () => void;
  icon: AvailableIcons;
  label: string;
  isBulkAction?: boolean;
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
