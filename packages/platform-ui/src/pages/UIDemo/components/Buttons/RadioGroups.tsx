import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { RadioButtonGroupField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { getStyles } from '../styles';

const { required } = validators;
const rbOptions = [
  { label: 'Foo label', value: 'Foo value' },
  { label: 'Bar label', value: 'Bar value' },
];

const RadioButtonGroupState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="radio-button-group-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="RadioButtonGroup"
            src="/FormFields/RadioButtonGroup.tsx#L8"
            state="State: enabled, validation: required"
          />
          <RadioButtonGroupField name="username" label="Username" options={rbOptions}validators={[required]} required />
        </form>
      )}
    </Form>
  );
};

export const RadioButtons: FC = () => (
  <>
    <RadioButtonGroupState1 />
  </>
);
