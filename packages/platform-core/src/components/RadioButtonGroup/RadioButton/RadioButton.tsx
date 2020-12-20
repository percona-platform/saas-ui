import React, { FC, useMemo, useRef } from 'react';
import { useStyles } from '@grafana/ui';
import { RadioButtonProps } from './RadioButton.types';
import { getStylesFn } from './RadioButton.styles';

export const RadioButton: FC<RadioButtonProps> = ({
  active = false,
  children,
  disabled = false,
  fullWidth,
  name,
  onChange,
  size = 'md',
}) => {
  const getStyles = useMemo(() => getStylesFn(size, fullWidth), [size, fullWidth]);
  const styles = useStyles(getStyles);
  const timestamp = new Date().valueOf() + Math.floor(Math.random() * 100);
  const id = useRef(`radio-btn-${timestamp}`);

  return (
    <>
      <input
        id={id.current}
        type="radio"
        data-qa={`${name}-radio-button`}
        className={styles.radio}
        onChange={onChange}
        disabled={disabled}
        checked={active}
        name={name}
      />
      <label className={styles.radioLabel} htmlFor={id.current}>
        {children}
      </label>
    </>
  );
};

RadioButton.displayName = 'RadioButton';
