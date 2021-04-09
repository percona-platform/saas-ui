import React, { FC, forwardRef } from 'react';
import { useStyles } from '@grafana/ui';
import { alert, Dropdown } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const DropdownState1: FC = () => {
  const styles = useStyles(getStyles);

  const DropdownToggle = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
    (props, ref) => (
      <button type="button" ref={ref} {...props} data-qa="menu-bar-profile-dropdown-toggle" className={styles.dropdownToggle}>
        Actions
      </button>
  ));

  const handleFirstAction = () => {
    alert('First');
  };

  const handleSecondAction = () => {
    alert('Second');
  };

  return (
    <>
      <Legend
        name="Dropdown"
        src="/Buttons/Dropdowns.tsx#L8-L45"
        state="State: default"
      />
      <Dropdown toggle={DropdownToggle}>
        <span data-qa="dropdown-open-action" onClick={handleFirstAction}>
          First
        </span>
        <span data-qa="dropdown-save-action" onClick={handleSecondAction}>
          Second
        </span>
      </Dropdown>
    </>
  );
};

export const Dropdowns: FC = () => (
  <>
    <Heading title="Dropdown" />
    <DropdownState1 />
  </>
);
