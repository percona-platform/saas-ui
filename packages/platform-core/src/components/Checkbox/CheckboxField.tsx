import React, { FC, useMemo } from 'react';
import { Field, FieldInputProps, FieldMetaState, UseFieldConfig } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { cx } from 'emotion';
import { getStyles } from './Checkbox.styles';
import { Validator, compose } from '@/shared/validators';

export interface CheckboxProps extends UseFieldConfig<boolean> {
  disabled?: boolean;
  fieldClassName?: string;
  label?: string;
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

  return (
    <Field {...fieldConfig} name={name} validate={validate}>
      {({ input, meta }: CheckboxFieldRenderProps) => {
        return (
          <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
            <label className={styles.wrapper}>
              <input
                type="checkbox"
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
        );
      }}
    </Field>
  );
};

CheckboxField.displayName = 'CheckboxField';
