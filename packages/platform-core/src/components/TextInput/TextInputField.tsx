import React, { FC, useMemo, ReactNode } from 'react';
import {
  Field, FieldMetaState, FieldInputProps, UseFieldConfig
} from 'react-final-form';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { Validator, compose } from '../../shared/validators';
import { getStyles } from './TextInput.styles';

/**
 * Note: the validation error message will be displayed once the the input has been modified.
 * To show the error message on blur you have to pass `showErrorOnBlur`.
 */
export interface TextInputFieldProps extends UseFieldConfig<string> {
  className?: string;
  disabled?: boolean;
  fieldClassName?: string;
  label?: string | ReactNode;
  name: string;
  onChange?: (value: string) => undefined;
  placeholder?: string;
  required?: boolean;
  showErrorOnBlur?: boolean;
  validators?: Validator[];
}

interface TextFieldRenderProps {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
}

export const TextInputField: FC<TextInputFieldProps> = React.memo(
  ({
    showErrorOnBlur = false,
    className,
    disabled = false,
    fieldClassName,
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
        {({ input, meta }: TextFieldRenderProps) => {
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
                type="text"
                {...input}
                disabled={disabled}
                placeholder={placeholder}
                data-qa={`${name}-text-input`}
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

TextInputField.displayName = 'TextInputField';
