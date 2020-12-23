import React, { useCallback, useMemo } from 'react';
import { cx } from 'emotion';
import {
  Field, FieldMetaState, FieldInputProps, UseFieldConfig,
} from 'react-final-form';
import { Icon, useStyles } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { Validator, compose } from '../../shared/validators';
import { FieldInputAttrs } from '../../shared/types';
import { RadioButtonSize, RadioButton } from './RadioButton';
import { getStyles } from './RadioButtonGroup.styles';

type RadionButtonGroupOptions = Array<SelectableValue<string> & { disabled?: boolean }>;

interface RadioButtonGroupFieldProps extends UseFieldConfig<string>{
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  inputProps?: FieldInputAttrs;
  label?: string;
  name: string;
  options: RadionButtonGroupOptions;
  required?: boolean;
  showErrorOnBlur?: boolean;
  size?: RadioButtonSize;
  validators?: Validator[];
}

interface RadioGroupFieldRenderProps {
  input: FieldInputProps<string>;
  meta: FieldMetaState<string>;
}

export function RadioButtonGroupField({
  className,
  disabled,
  fullWidth = false,
  inputProps,
  label,
  name,
  options,
  required = false,
  showErrorOnBlur = false,
  size = 'md',
  validators,
  ...fieldConfig
}: RadioButtonGroupFieldProps) {
  const handleOnChange = useCallback(
    (option: SelectableValue<string>, input) => {
      return () => {
        if (option.disabled) {
          return;
        }

        input.onChange(option.value);
      };
    },
    [],
  );
  const styles = useStyles(getStyles);
  const validate = useMemo(() => (Array.isArray(validators) ? compose(...validators) : undefined), [
    validators,
  ]);

  return (
    <Field {...fieldConfig} type="text" name={name} validate={validate}>
      {({ input, meta }: RadioGroupFieldRenderProps) => {
        const validationError = ((!showErrorOnBlur && meta.modified) || meta.touched) && meta.error;

        return (
          <div className={cx(styles.wrapper, className)}>
            {label && (
              <div className={styles.label} data-qa={`${name}-field-label`}>
                {`${label}${required ? ' *' : ''}`}
              </div>
            )}
            {/* this field is auxiliary, i.e. it helps address the validation, which is tricky otherwise */}
            <input
              {...input}
              data-qa={`${name}-radio-state`}
              className={styles.input}
            />
            <div className={styles.buttonContainer}>
              {options.map((o) => (
                <RadioButton
                  checked={input.value === o.value}
                  disabled={o.disabled || disabled}
                  fullWidth={fullWidth}
                  inputProps={inputProps}
                  key={o.label}
                  name={name}
                  onChange={handleOnChange(o, input)}
                  size={size}
                >
                  {o.icon && <Icon name={o.icon} className={styles.icon} />}
                  {o.label}
                </RadioButton>
              ))}
            </div>
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
