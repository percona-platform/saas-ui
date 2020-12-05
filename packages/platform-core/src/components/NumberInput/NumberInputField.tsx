import React, {
  FC, useCallback, useRef, useMemo,
} from 'react';
import { cx } from 'emotion';
import { useStyles } from '@grafana/ui';
import {
  Field, FieldMetaState, FieldInputProps, UseFieldConfig,
} from 'react-final-form';
import { getStyles } from './NumberInput.styles';
import { Validator, compose } from '../../shared/validators';
import { FieldInputAttrs } from '../../shared/types';

export interface NumberInputFieldProps extends UseFieldConfig<number> {
  className?: string;
  disabled?: boolean;
  fieldClassName?: string;
  inputProps?: FieldInputAttrs;
  label?: string;
  name: string;
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
  className,
  disabled = false,
  fieldClassName,
  inputProps,
  label,
  name,
  placeholder,
  required = false,
  showErrorOnBlur = false,
  validators,
  ...fieldConfig
}) => {
  const styles = useStyles(getStyles);
  const inputId = `input-${name}-id`;
  const validate = useMemo(() => (Array.isArray(validators) ? compose(...validators) : undefined), [
    validators,
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatchChangeEvent = useCallback(() => {
    const event = new Event('change', { bubbles: true });

    if (inputRef.current) {
      inputRef.current.dispatchEvent(event);
    }
  }, [inputRef]);

  const stepUp = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.stepUp();
    }

    dispatchChangeEvent();
  }, [inputRef, dispatchChangeEvent]);

  const stepDown = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.stepDown();
    }

    dispatchChangeEvent();
  }, [inputRef, dispatchChangeEvent]);

  return (
    <Field {...fieldConfig} type="number" name={name} validate={validate}>
      {({ input, meta }: NumberFieldRenderProps) => {
        const validationError = ((!showErrorOnBlur && meta.modified) || meta.touched) && meta.error;

        return (
          <div className={cx(styles.field, fieldClassName)} data-qa={`${name}-field-container`}>
            {label && (
              <label className={styles.label} htmlFor={inputId} data-qa={`${name}-field-label`}>
                {`${label}${required ? ' *' : ''}`}
              </label>
            )}
            <span className={styles.inputWrapper}>
              <input
                id={inputId}
                {...input}
                {...inputProps}
                ref={inputRef}
                disabled={disabled}
                placeholder={placeholder}
                data-qa={`${name}-number-input`}
                className={cx(styles.input, { invalid: !!validationError }, className)}
              />
              {!disabled && (
                <>
                  <button
                    type="button"
                    className={styles.buttonUp}
                    onClick={stepUp}
                  >
                    <span className={styles.arrowUp} />
                  </button>
                  <button
                    type="button"
                    className={styles.buttonDown}
                    onClick={stepDown}
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
