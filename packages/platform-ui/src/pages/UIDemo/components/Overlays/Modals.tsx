import React, { FC, useState, ChangeEvent } from 'react';
import { useStyles , Button, Checkbox } from '@grafana/ui';
import { Modal } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const ModalState1: FC = () => {
  const styles = useStyles(getStyles);
  const [visible, setVisible] = useState(false);
  const [closeOnClickaway, setCloseOnClickaway] = useState(true);
  const [closeOnEscape, setCloseOnEscape] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleChangeCloseOnClickaway = (event: ChangeEvent<HTMLInputElement>) => {
    setCloseOnClickaway(event.target.checked);
  };

  const handleChangeCloseOnEscape = (event: ChangeEvent<HTMLInputElement>) => {
    setCloseOnEscape(event.target.checked);
  };

  return (
    <>
      <Legend
        name="Modal"
        src="/Overlays/Modals.tsx#L8-L54"
        state="State: title: string, extra: closeOnEscape toggle, closeOnClickaway toggle"
      />
      <div className={styles.tuningCheckbox}>
        <Checkbox css="" label="Click on escape" value={closeOnEscape} onChange={handleChangeCloseOnEscape} />
      </div>
      <div className={styles.tuningCheckbox}>
        <Checkbox css="" label="Click on click away" value={closeOnClickaway} onChange={handleChangeCloseOnClickaway} />
      </div>
      <Modal title="Demo Modal" closeOnEscape={closeOnEscape} closeOnClickaway={closeOnClickaway} isVisible={visible} onClose={handleClose}>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
          Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
          Mauris placerat eleifend leo.
        </p>
      </Modal>
      <Button onClick={handleOpen}>Open Modal</Button>
    </>
  );
};

const ModalState2: FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const ModalTitle: FC = () => <strong>Modal Title</strong>;

  return (
    <>
      <Legend
        name="Modal"
        src="/Overlays/Modals.tsx#L56-L87"
        state="State: title: HTML element, closeOnEscape: true, closeOnClickaway: true"
      />
      <Modal title={<ModalTitle />} isVisible={visible} onClose={handleClose}>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
          Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
          Mauris placerat eleifend leo.
        </p>
      </Modal>
      <Button onClick={handleOpen}>Open Modal</Button>
    </>
  );
};

export const Modals: FC = () => (
  <>
    <Heading title="Modal" />
    <ModalState1 />
    <ModalState2 />
  </>
);
