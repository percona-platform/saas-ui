import React, { FC } from 'react';
import { TableToolbar } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';

const TableToolbarState1: FC = () => {
  const addAction = () => {
    /* eslint-disable-next-line no-alert */
    alert('Add');
  };

  const removeAction = () => {
    /* eslint-disable-next-line no-alert */
    alert('Remove');
  };

  const enableAction = () => {
    /* eslint-disable-next-line no-alert */
    alert('Enable');
  };

  const actions = [
    { callback: addAction, label: 'Add', icon: 'plusSquare' },
    { callback: removeAction, label: 'Remove', icon: 'minusSquare', isBulkAction: true },
    { callback: enableAction, label: 'Enable', icon: 'enabledSquare', isBulkAction: true },
  ];

  return (
    <>
      <Legend
        name="TableToolbar"
        src="/Buttons/LoaderButtons.tsx#L19-L48"
        state="State: enabled, extras: selectable size"
      />
      <TableToolbar actions={actions} selectedItems={[]} />
    </>
  );
};

export const TableToolbars: FC = () => (
  <>
    <Heading title="TableToolbar" />
    <TableToolbarState1 />
  </>
);
