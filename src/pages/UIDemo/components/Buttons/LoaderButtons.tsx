import React, { FC, useState } from 'react';
import { useStyles, Select, Label } from '@grafana/ui';
import { ComponentSize } from '@grafana/ui/types/size';
import { SelectableValue } from '@grafana/data';
import { sleep, LoaderButton } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const DELAY = 2000;

const SIZE_OPTIONS: Array<SelectableValue<ComponentSize>> = [
  {label: 'xs', value: 'xs'},
  {label: 'sm', value: 'sm'},
  {label: 'md (default)', value: 'md'},
  {label: 'lg', value: 'lg'},
];

const LoaderButtonState1: FC = () => {
  const [loading, setLoading] = useState(false);
  const styles = useStyles(getStyles);

  const handleClick = async () => {
    setLoading(true);
    await sleep(DELAY);
    setLoading(false);
  };

  const [size, setSize] = useState(SIZE_OPTIONS[2]);

  return (
    <>
      <Legend
        name="LoaderButton"
        src="/Buttons/LoaderButtons.tsx#L19-L48"
        state="State: enabled, extras: selectable size"
      />
      <LoaderButton size={size.value} loading={loading} onClick={handleClick}>Submit</LoaderButton>
      <Label className={styles.sizeSelectLabel}>Size</Label>
      <Select
        className={styles.sizeSelect}
        value={size}
        onChange={(selectedSize) => { setSize(selectedSize);}}
        options={SIZE_OPTIONS}
      />
    </>
  );
};

const LoaderButtonState2: FC = () => {
  const [loading, setLoading] = useState(false);
  const styles = useStyles(getStyles);

  const handleClick = async () => {
    setLoading(true);
    await sleep(DELAY);
    setLoading(false);
  };

  return (
    <>
      <Legend
        name="LoaderButton"
        src="/Buttons/LoaderButtons.tsx#L50-75"
        state="State: enabled, size: 'md', extra: width specified"
      />
      <LoaderButton
        className={styles.loaderButton}
        loading={loading}
        onClick={handleClick}>
          Submit
        </LoaderButton>
    </>
  );
};

const LoaderButtonState3: FC = () => (
  <>
    <Legend
      name="LoaderButton"
      src="/Buttons/LoaderButtons.tsx#L77-L86"
      state="State: loading, size: 'md'"
    />
    <LoaderButton loading>Submit</LoaderButton>
  </>
);

const LoaderButtonState4: FC = () => (
  <>
    <Legend
      name="LoaderButton"
      src="/Buttons/LoaderButtons.tsx#L88-L97"
      state="State: disabled, size: 'md'"
    />
    <LoaderButton disabled>Submit</LoaderButton>
  </>
);

export const LoaderButtons: FC = () => (
  <>
    <Heading title="LoaderButton" />
    <LoaderButtonState1 />
    <LoaderButtonState2 />
    <LoaderButtonState3 />
    <LoaderButtonState4 />
  </>
);
