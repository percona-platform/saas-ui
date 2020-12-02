import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { TextInputField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { getStyles } from '../styles';

const { required } = validators;

export const TextInputFieldState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L8"
            state="State: enabled, validation: required"
          />
          <TextInputField name="username" label="Username" validators={[required]} required />
        </form>
      )}
    </Form>
  );
};

const MIN_LENGH = 6;
const minLength = validators.minLength(MIN_LENGH);

export const TextInputFieldState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L30"
            state="State: enabled, validation: minLengh(6)"
          />
          <TextInputField name="address1" label="Address 1" validators={[minLength]} />
        </form>
      )}
    </Form>
  );
};

export const TextInputFieldState3: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L53"
            state="State: enabled, validation: none"
          />
          <TextInputField name="address2" label="Address 2" />
        </form>
      )}
    </Form>
  );
};

export const TextInputFieldState4: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L73"
            state="State: disabled, validation: none"
          />
          <TextInputField name="social-status" label="Social status" disabled />
        </form>
      )}
    </Form>
  );
};

// TODO: consider one component per file for easier file referencing
export const TextInputFields: FC = () => (
  <>
    <TextInputFieldState1 />
    <TextInputFieldState2 />
    <TextInputFieldState3 />
    <TextInputFieldState4 />
  </>
);
