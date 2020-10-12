import React, { FC, useCallback, useRef, useMemo } from 'react';
import { cx } from 'emotion';
import { useTheme } from '@grafana/ui';
import { getStyles } from './NumberInput.styles';
import { Field, FieldMetaState, FieldInputProps, UseFieldConfig } from 'react-final-form';
import { Validator, compose } from '../../shared/validators';

export interface NumberInputFieldProps extends UseFieldConfig<number> {
  label?: string;
  labelWidth?: number;
  className?: string;
  disabled?: boolean;
  fieldClassName?: string;
  name: string;
  onChange?: (value: string) => undefined;
  placeholder?: string;
  required?: boolean;
  showErrorOnBlur?: boolean;
  validators?: Validator[];
}

interface NumberFieldRenderProps {
  input: FieldInputProps<number>;
  meta: FieldMetaState<number>;
}

export const NumberInputField: FC<NumberInputFieldProps> = React.memo(({
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

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatchChangeEvent = useCallback(() => {
    const event = new Event('change', { bubbles: true });

    inputRef.current!.dispatchEvent(event);
  }, [inputRef]);

  const stepUp = () => {
    inputRef.current!.stepUp();
    dispatchChangeEvent();
  };

  const stepDown = () => {
    inputRef.current!.stepDown();
    dispatchChangeEvent();
  };

  return (
    <Field {...fieldConfig} name={name} validate={validate}>
      {({ input, meta }: NumberFieldRenderProps) => {
        const validationError = ((!showErrorOnBlur && meta.modified) || meta.touched) && meta.error;

        return (
          <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
            {label && (
              <label className={styles.label} htmlFor={inputId} data-qa={`${name}-field-label`}>{`${label}${required ? ' *' : ''}`}
              </label>
            )}
            <span className={styles.inputWrapper}>
              <input
                id={inputId}
                type="number"
                {...input}
                ref={inputRef}
                disabled={disabled}
                placeholder={placeholder}
                data-qa={`${name}-text-input`}
                className={cx(styles.input, { invalid: !!validationError }, className)}
              />
              {!disabled && (
                <>
                  <button
                    type="button"
                    className={styles.buttonUp}
                    onClick={stepUp}
                    disabled={disabled}
                  >
                    <span className={styles.arrowUp} />
                  </button>
                  <button
                    type="button"
                    className={styles.buttonDown}
                    onClick={stepDown}
                    disabled={disabled}
                  >
                    <span className={styles.arrowDown} />
                  </button>
                </>
              )}
            </span>
            <div data-qa={`${name}-field-error-message`} className={styles.errorMessage}>
              {validationError}
            </div>
          </div>
        );
      }}
    </Field>
  );
});

NumberInputField.displayName = 'NumberInputField';
