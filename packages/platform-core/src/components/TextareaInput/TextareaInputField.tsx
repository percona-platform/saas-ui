import React, { FC, useMemo } from 'react';
import { Field, FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { Validator, compose } from '../../shared/validators';
import { getStyles } from './TextInput.styles';

/**
 * Note: the validation error message will be displayed once the the input has been modified.
 * To show the error message on blur you have to pass `showErrorOnBlur`.
 */
export interface TextareaInputFieldProps extends UseFieldConfig<string> {
  className?: string;
  disabled?: boolean;
  fieldClassName?: string;
  label?: string | JSX.Element;
  name: string;
  onChange?: (value: string) => undefined;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  showErrorOnBlur?: boolean;
  validators?: Validator[];
}

interface TextareaFieldRenderProps {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
}

export const TextareaInputField: FC<TextareaInputFieldProps> = React.memo(
  ({
    className,
    disabled = false,
    fieldClassName,
    label,
    name,
    placeholder,
    required = false,
    rows = 5,
    showErrorOnBlur = false,
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
        {({ input, meta }: TextareaFieldRenderProps) => {
          const validationError = ((!showErrorOnBlur && meta.modified) || meta.touched) && meta.error;

          return (
            <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
              {label && (
                <label className={styles.label} htmlFor={inputId} data-qa={`${name}-field-label`}>
                  {`${label}${required ? ' *' : ''}`}
                </label>
              )}
              <textarea
                id={inputId}
                {...input}
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
                data-qa={`${name}-textarea-input`}
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

TextareaInputField.displayName = 'TextareaInputField';
