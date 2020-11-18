import React, { FC, useMemo } from 'react';
import { useTheme } from '@grafana/ui';
import { Icon, AvailableIcons } from '../Icon';
import { getStyles } from './TableToolbarButton.styles';

interface TableToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: AvailableIcons;
  label: string;
  enabled?: boolean;
}

export const TableToolbarButton: FC<TableToolbarButtonProps> = ({
  icon,
  label,
  enabled = true,
  ...props
}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <button {...props} type="button" className={styles.button}>
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
};
