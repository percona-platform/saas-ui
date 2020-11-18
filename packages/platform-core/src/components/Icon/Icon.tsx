import React, { FC } from 'react';
import { AvailableIcons, Icons } from './types';

import { TableToolbarAdd } from '../../shared/icons/TableToolbarAdd';
import { TableToolbarDelete } from '../../shared/icons/TableToolbarDelete';
import { TableToolbarEnable } from '../../shared/icons/TableToolbarEnable';
import { TableToolbarDisable } from '../../shared/icons/TableToolbarDisable';

// TODO: improve this mapping
const icons: Icons  = {
  toolbarAdd: TableToolbarAdd,
  toolbarDelete: TableToolbarDelete,
  toolbarEnable: TableToolbarEnable,
  toolbarDisable: TableToolbarDisable,
};

interface IconProps {
  name: AvailableIcons;
}

export const Icon: FC<IconProps> = ({ name }) => {
  const IconComponent = icons[name];

  return <IconComponent />;
};
