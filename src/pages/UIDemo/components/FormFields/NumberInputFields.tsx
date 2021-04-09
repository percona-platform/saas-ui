import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { NumberInputField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const { required } = validators;

const NumberInputFieldState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="number-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="NumberInputField"
            src="/FormFields/NumberInputFields.tsx#L9-L29"
            state="State: enabled, validation: required"
          />
          <NumberInputField name="threshold" label="Threshold" validators={[required]} required />
        </form>
      )}
    </Form>
  );
};

const NumberInputFieldState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="number-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="NumberInputField"
            src="/FormFields/NumberInputFields.tsx#L31-L49"
            state="State: enabled, validation: none"
          />
          <NumberInputField name="duration" label="Duration (s)" />
        </form>
      )}
    </Form>
  );
};

const NumberInputFieldState3: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="number-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="NumberInputField"
            src="/FormFields/NumberInputFields.tsx#L51-L69"
            state="State: disabled, validation: none"
          />
          <NumberInputField name="length" label="length (m)" disabled />
        </form>
      )}
    </Form>
  );
};

// TODO: consider one component per file for easier file referencing
export const NumberInputFields: FC = () => (
  <>
    <Heading title="NumberInputField" />
    <NumberInputFieldState1 />
    <NumberInputFieldState2 />
    <NumberInputFieldState3 />
  </>
);
