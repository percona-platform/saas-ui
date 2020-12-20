import React, { FC, useMemo, useRef } from 'react';
import { useStyles } from '@grafana/ui';
import { generateId } from '../../../shared';
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
  const id = useMemo(generateId, [generateId]);
  const inputId = useRef(`radio-btn-${id}`);

  return (
    <>
      <input
        id={inputId.current}
        type="radio"
        data-qa={`${name}-radio-button`}
        className={styles.radio}
        onChange={onChange}
        disabled={disabled}
        checked={active}
        name={name}
      />
      <label className={styles.radioLabel} htmlFor={inputId.current}>
        {children}
      </label>
    </>
  );
};

RadioButton.displayName = 'RadioButton';
