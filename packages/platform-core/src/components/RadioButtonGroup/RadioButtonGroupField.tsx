import React, { useCallback, useMemo } from 'react';
import { cx } from 'emotion';
import {
  Field, FieldMetaState, FieldInputProps, UseFieldConfig,
} from 'react-final-form';
import { Icon, useStyles } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { Validator, compose } from '../../shared/validators';
import { RadioButtonSize, RadioButton } from '../RadioButton';
import { getStyles } from './RadioButtonGroup.styles';

type RadionButtonGroupOptions<T> = Array<SelectableValue<T> & { disabled?: boolean }>;

interface RadioButtonGroupFieldProps<T> extends UseFieldConfig<T>{
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  name: string;
  onChange?: (value?: T) => void;
  options: RadionButtonGroupOptions<T>;
  required?: boolean;
  showErrorOnBlur?: boolean;
  size?: RadioButtonSize;
  validators?: Validator[];
  value?: T;
}

interface NumberFieldRenderProps {
  input: FieldInputProps<number>;
  meta: FieldMetaState<number>;
}

export function RadioButtonGroupField<T>({
  className,
  disabled,
  fullWidth = false,
  label,
  name,
  onChange,
  options,
  required = false,
  showErrorOnBlur = false,
  size = 'md',
  validators,
  value,
  ...fieldConfig
}: RadioButtonGroupFieldProps<T>) {
  const handleOnChange = useCallback(
    (option: SelectableValue) => {
      return () => {
        if (onChange) {
          onChange(option.value);
        }
      };
    },
    [onChange],
  );
  const styles = useStyles(getStyles);
  const validate = useMemo(() => (Array.isArray(validators) ? compose(...validators) : undefined), [
    validators,
  ]);

  return (
    <Field {...fieldConfig} type="radio" name={name} validate={validate}>
      {({ input, meta }: NumberFieldRenderProps) => {
        const validationError = ((!showErrorOnBlur && meta.modified) || meta.touched) && meta.error;

        return (
          <div className={cx(styles.field, className)}>
            {label && (
              <div className={styles.label} data-qa={`${name}-field-label`}>
                {`${label}${required ? ' *' : ''}`}
              </div>
            )}
            {options.map((o) => (
              <RadioButton
                active={value === o.value}
                disabled={o.disabled || disabled}
                key={o.label}
                onChange={handleOnChange(o)}
                name={name}
                size={size}
                fullWidth={fullWidth}
              >
                {o.icon && <Icon name={o.icon} className={styles.icon} />}
                {o.label}
              </RadioButton>
            ))}
            <div data-qa={`${name}-field-error-message`} className={styles.errorMessage}>
              {validationError}
            </div>
          </div>
        );
      }}
    </Field>
  );

}

RadioButtonGroupField.displayName = 'RadioButtonGroupField';
