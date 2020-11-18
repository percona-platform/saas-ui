import React, { FC, useMemo } from 'react';
import { AvailableIcons } from 'components/Icon';
import { error } from '../../shared/logger';
import { TableToolbarButton } from './TableToolbarButton';
import { getStyles } from './TableToolbar.styles';
import { Messages } from './TableToolbar.messages';

interface Action {
  callback: () => {};
  icon: AvailableIcons;
  label: string;
  minItems?: number;
  maxItems?: number;
}

interface TableToolbarProps {
  actions: Action[];
  selectedItems: any[];
}

export const TableToolbar: FC<TableToolbarProps> = ({ actions, selectedItems }) => {
  const styles = useMemo(() => getStyles(), []);

  return (
    <div className={styles.wrapper}>
      {actions.map(action => {
        const {
          callback,
          icon,
          minItems = 0,
          maxItems = Infinity,
          label,
        } = action;

        if (minItems < 0 || maxItems < 0) {
          error(Messages.negativeNumberError);
        }

        if (maxItems < minItems) {
          error(Messages.minLessThanMaxError);
        }

        const selectedItemsLen = selectedItems.length;

        return <TableToolbarButton
          key={`${icon}-${label}`}
          icon={icon}
          label={label}
          disabled={selectedItemsLen < minItems || selectedItemsLen > maxItems}
          onClick={callback}
        />;
      })}
    </div>
  );
};
