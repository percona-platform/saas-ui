import React, { FC, useMemo, ReactNode } from 'react';
import { Field, UseFieldConfig, FieldMetaState, FieldInputProps } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { getStyles } from './Checkbox.styles';
import { Validator, compose } from '../../shared/validators';
import { FieldInputAttrs } from '../../shared/types';

export interface CheckboxProps extends UseFieldConfig<boolean> {
  disabled?: boolean;
  fieldClassName?: string;
  inputProps?: FieldInputAttrs;
  label?: string | ReactNode;
  name: string;
  validators?: Validator[];
}

interface CheckboxFieldRenderProps {
  input: FieldInputProps<string, HTMLInputElement>;
  meta: FieldMetaState<string>;
}

export const CheckboxField: FC<CheckboxProps> = React.memo(({
  disabled,
  fieldClassName,
  inputProps,
  label,
  name,
  validators,
  ...fieldConfig
}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const inputId = `input-${name}-id`;
  const validate = useMemo(() => (Array.isArray(validators) ? compose(...validators) : undefined), [
    validators,
  ]);

  return (
    <Field {...fieldConfig} type="checkbox" name={name} validate={validate}>
      {({ input, meta }: CheckboxFieldRenderProps) => (
        <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
          <label className={styles.wrapper} htmlFor={inputId}>
            <input
              id={inputId}
              {...inputProps}
              {...input}
              disabled={disabled}
              data-qa={`${name}-checkbox-input`}
              className={styles.input}
            />
            <span className={styles.checkmark} />
            {label && (
            <span className={styles.label} data-qa={`${name}-field-label`}>
              {label}
            </span>
            )}
          </label>
          <div data-qa={`${name}-field-error-message`} className={styles.errorMessage}>
            {meta.touched && meta.error}
          </div>
        </div>
      )}
    </Field>
  );
});

CheckboxField.displayName = 'CheckboxField';
