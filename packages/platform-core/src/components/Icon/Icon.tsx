import React, { FC } from 'react';
import { AvailableIcons, Icons } from './types';

import {
  MinusSquare,
  PlusSquare,
  SelectedSquare,
  UnselectedSquare,
} from '../../shared/icons';

// TODO: improve this mapping
const icons: Icons  = {
  plusSquare: PlusSquare,
  minusSquare: MinusSquare,
  selectedSquare: SelectedSquare,
  unselectedSquare: UnselectedSquare,
};

interface IconProps {
  name: AvailableIcons;
}

export const Icon: FC<IconProps> = ({ name }) => {
  const IconComponent = icons[name];

  return <IconComponent />;
};
