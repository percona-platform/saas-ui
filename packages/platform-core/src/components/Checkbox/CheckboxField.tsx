import React, { FC, useMemo, ReactNode } from 'react';
import {
  Field, FieldInputProps, FieldMetaState, UseFieldConfig,
} from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { getStyles } from './Checkbox.styles';
import { Validator, compose } from '../../shared/validators';

export interface CheckboxProps extends UseFieldConfig<boolean> {
  disabled?: boolean;
  fieldClassName?: string;
  label?: string | ReactNode;
  name: string;
  onChange?: (value: boolean) => undefined;
  validators?: Validator[];
}

interface CheckboxFieldRenderProps {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
}

export const CheckboxField: FC<CheckboxProps> = ({
  disabled,
  fieldClassName,
  label,
  name,
  validators,
  ...fieldConfig
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const validate = useMemo(() => (Array.isArray(validators) ? compose(...validators) : undefined), [
    validators,
  ]);

  // TODO: fix the eslint issue here
  return (
    <Field {...fieldConfig} type="checkbox" name={name} validate={validate}>
      {({ input, meta }: CheckboxFieldRenderProps) => (
        <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className={styles.wrapper}>
            <input
              {...input}
              type="checkbox"
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
};

CheckboxField.displayName = 'CheckboxField';
