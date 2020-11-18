import React, { FC } from 'react';

import AddIcon from '../../shared/icons/TableToolbarAdd';
import DeleteIcon from '../../shared/icons/TableToolbarDelete';
import EnableIcon from '../../shared/icons/TableToolbarEnable';
import DisableIcon from '../../shared/icons/TableToolbarDisable';

export type AvailableIcons = 'toolbarAdd' | 'toolbarDelete' | 'toolbarEnable' | 'toolbarDisable';

type Icons = {
  [I in AvailableIcons]: React.ElementType;
}

// TODO: improve this mapping
const icons: Icons  = {
  toolbarAdd: AddIcon,
  toolbarDelete: DeleteIcon,
  toolbarEnable: EnableIcon,
  toolbarDisable: DisableIcon,
};

interface IconProps {
  name: AvailableIcons;
}

export const Icon: FC<IconProps> = ({ name }) => {
  const IconComponent = icons[name];

  return <IconComponent />;
};
