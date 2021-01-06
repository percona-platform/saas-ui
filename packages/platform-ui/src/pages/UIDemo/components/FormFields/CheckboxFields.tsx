import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { CheckboxField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const { requiredTrue } = validators;

const CheckboxFieldState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="checkbox-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="CheckboxField"
            src="/FormFields/CheckboxFields.tsx#L9-L29"
            state="State: enabled, validation: requiredTrue"
          />
          <CheckboxField name="accept" label="Accept" validators={[requiredTrue]} />
        </form>
      )}
    </Form>
  );
};

const CheckboxFieldState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="checkbox-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="CheckboxField"
            src="/FormFields/CheckboxFields.tsx#L31-L49"
            state="State: enabled, validation: none"
          />
          <CheckboxField name="agreed" label="I agree" />
        </form>
      )}
    </Form>
  );
};

const CheckboxFieldState3: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="checkbox-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="CheckboxField"
            src="/FormFields/CheckboxFields.tsx#L73-L91"
            state="State: disabled, validation: none"
          />
          <CheckboxField name="enable-feature" label="Enable feature" disabled />
        </form>
      )}
    </Form>
  );
};

// TODO: consider one component per file for easier file referencing
export const CheckboxFields: FC = () => (
  <>
    <Heading title="CheckboxField" />
    <CheckboxFieldState1 />
    <CheckboxFieldState2 />
    <CheckboxFieldState3 />
  </>
);
