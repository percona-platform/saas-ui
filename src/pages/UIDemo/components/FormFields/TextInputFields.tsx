import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { TextInputField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const { required } = validators;

const TextInputFieldState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L9-L29"
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

const TextInputFieldState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L31-L52"
            state="State: enabled, validation: minLengh(6)"
          />
          <TextInputField name="address1" label="Address 1" validators={[minLength]} />
        </form>
      )}
    </Form>
  );
};

const TextInputFieldState3: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L54-L72"
            state="State: enabled, validation: none"
          />
          <TextInputField name="address2" label="Address 2" />
        </form>
      )}
    </Form>
  );
};

const TextInputFieldState4: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="TextInputField"
            src="/FormFields/TextInputFields.tsx#L74-L92"
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
    <Heading title="TextInputField" />
    <TextInputFieldState1 />
    <TextInputFieldState2 />
    <TextInputFieldState3 />
    <TextInputFieldState4 />
  </>
);
