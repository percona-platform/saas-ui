import React, { FC, useMemo } from 'react';
import { error } from '../../shared/logger';
import { TableToolbarButton } from './TableToolbarButton';
import { getStyles } from './TableToolbar.styles';
import { Messages } from './TableToolbar.messages';
import { TableToolbarProps } from './types';

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
        } else if (maxItems < minItems) {
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
