import React, { FC } from 'react';
import { AvailableIcons, Icons } from './types';

import {
  TableToolbarAdd,
  TableToolbarDelete,
  TableToolbarEnable,
  TableToolbarDisable,
} from '../../shared/icons';

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
