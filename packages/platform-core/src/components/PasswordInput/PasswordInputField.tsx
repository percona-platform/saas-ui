import React, { FC, useMemo } from 'react';
import { Field, FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { Validator, compose } from 'shared/validators';
import { getStyles } from './PasswordInput.styles';

/**
 * Note: the validation error message will only be displayed after the input has been
 * touched and then blurred. To override this you have to pass `alwaysShowError={false}`.
 */
export interface PasswordInputFieldProps {
  alwaysShowError?: boolean;
  className?: string;
  disabled?: boolean;
  fieldClassName?: string;
  fieldConfig?: UseFieldConfig<string>;
  label?: string;
  name: string;
  onChange?: (value: string) => undefined;
  placeholder?: string;
  required?: boolean;
  validators?: Validator[];
}

export interface PasswordFieldRenderProps {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
}

export const PasswordInputField: FC<PasswordInputFieldProps> = React.memo(
  ({
    alwaysShowError = false,
    fieldClassName,
    className,
    disabled = false,
    fieldConfig,
    label,
    name,
    placeholder,
    required = false,
    validators,
  }) => {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), [theme]);
    const inputId = `input-${name}-id`;
    const validate = useMemo(() => (Array.isArray(validators) ? compose(...validators) : undefined), [
      validators,
    ]);

    return (
      <Field {...fieldConfig} name={name} validate={validate}>
        {({ input, meta }: PasswordFieldRenderProps) => (
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
              className={cx(
                styles.input,
                { invalid: (alwaysShowError || meta.touched) && meta.error },
                className,
              )}
            />
            <div data-qa={`${name}-field-error-message`} className={styles.errorMessage}>
              {meta.touched && meta.error}
            </div>
          </div>
        )}
      </Field>
    );
  },
);
