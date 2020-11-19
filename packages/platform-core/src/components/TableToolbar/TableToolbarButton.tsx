import React, { FC } from 'react';
import { cx } from 'emotion';
import { useStyles } from '@grafana/ui';
import { Icon } from '../Icon';
import { getStyles } from './TableToolbarButton.styles';
import { TableToolbarButtonProps } from './types';

export const TableToolbarButton: FC<TableToolbarButtonProps> = ({
  className,
  icon,
  label,
  ...props
}) => {
  const styles = useStyles(getStyles);

  return (
    <button {...props} type="button" className={cx(styles.button, className)}>
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
};
