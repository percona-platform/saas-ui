import React, { FC, useMemo } from 'react';
import { Field, FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { Validator, compose } from '../../shared/validators';
import { getStyles } from './PasswordInput.styles';

/**
 * Note: the validation error message will be displayed once the the input has been modified.
 * To show the error message on blur you have to pass `showErrorOnBlur`.
 */
export interface PasswordInputFieldProps extends UseFieldConfig<string> {
  showErrorOnBlur?: boolean;
  className?: string;
  disabled?: boolean;
  fieldClassName?: string;
  label?: string | JSX.Element;
  name: string;
  onChange?: (value: string) => undefined;
  placeholder?: string;
  required?: boolean;
  validators?: Validator[];
}

interface PasswordFieldRenderProps {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
}

export const PasswordInputField: FC<PasswordInputFieldProps> = React.memo(
  ({
    showErrorOnBlur = false,
    fieldClassName,
    className,
    disabled = false,
    label,
    name,
    placeholder,
    required = false,
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
      <Field {...fieldConfig} name={name} validate={validate}>
        {({ input, meta }: PasswordFieldRenderProps) => {
          const validationError = ((!showErrorOnBlur && meta.modified) || meta.touched) && meta.error;

          return (
            <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
              {label && (
                <label className={styles.label} htmlFor={inputId} data-qa={`${name}-field-label`}>
                  {`${label}${required ? ' *' : ''}`}
                </label>
              )}
              <input
                id={inputId}
                type="password"
                {...input}
                disabled={disabled}
                placeholder={placeholder}
                data-qa={`${name}-password-input`}
                className={cx(styles.input, { invalid: !!validationError }, className)}
              />
              <div data-qa={`${name}-field-error-message`} className={styles.errorMessage}>
                {validationError}
              </div>
            </div>
          );
        }}
      </Field>
    );
  },
);

PasswordInputField.displayName = 'PasswordInputField';
