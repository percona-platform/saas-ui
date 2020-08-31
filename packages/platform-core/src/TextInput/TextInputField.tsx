import React, { FC } from 'react';
import { Field } from 'react-final-form';
import { cx } from 'emotion';
import { Input, useTheme } from '@grafana/ui';
import { Validator, compose } from '../shared/validators';
import { getStyles } from './TextInput.styles';

export interface TextInputFieldProps {
  className?: string;
  dataQa?: string;
  label: string;
  name: string;
  validators?: Validator[];
}

export const TextInputField: FC<TextInputFieldProps> = ({ className, label, name, dataQa, validators }) => {
  const styles = getStyles(useTheme());
  const validate = Array.isArray(validators) ? compose(...validators) : undefined;

  return (
    <Field data-qa={dataQa} name={name} label={label} validate={validate} className={styles.field}>
      {({ input, meta }: { input: any; meta?: any }) => {
        return (
          <>
            <Input {...input} className={cx(className, { invalid: meta.touched && meta.error })} />
            <div data-qa={`${name}-field-error-message`} className={styles.errorMessage}>
              {meta.touched && meta.error}
            </div>
          </>
        );
      }}
    </Field>
  );
};
