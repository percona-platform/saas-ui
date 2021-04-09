import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { PasswordInputField, validators } from '@percona/platform-core';
import { Legend } from '../Legend';
import { Heading } from '../Heading';
import { getStyles } from '../styles';

const { required, containsLowercase, containsNumber, containsUppercase, minLength } = validators;

const PasswordInputFieldState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="password-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="PasswordInputField"
            src="/FormFields/PasswordInputFields.tsx#L9-L29"
            state="State: enabled, validation: required"
          />
          <PasswordInputField name="password" label="Password" validators={[required]} required />
        </form>
      )}
    </Form>
  );
};

const MIN_LENGTH = 8;

const PasswordInputFieldState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="password-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="PasswordInputField"
            src="/FormFields/PasswordInputFields.tsx#L31-L51"
            state="State: enabled, validation: [containsLowercase, containsUppercase, containsNumber, minLength(8)]"
          />
         <PasswordInputField name="password" label="Password" validators={[containsLowercase, containsUppercase, containsNumber, minLength(MIN_LENGTH)]} required />
        </form>
      )}
    </Form>
  );
};

const PasswordInputFieldState3: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="password-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="PasswordInputField"
            src="/FormFields/PasswordInputFields.tsx#L53-L71"
            state="State: enabled, validation: none"
          />
          <PasswordInputField name="password" label="Password" />
        </form>
      )}
    </Form>
  );
};

const PasswordInputFieldState4: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="password-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <Legend
            name="PasswordInputField"
            src="/FormFields/PasswordInputFields.tsx#L73-L91"
            state="State: disabled, validation: none"
          />
          <PasswordInputField name="password" label="Password" disabled />
        </form>
      )}
    </Form>
  );
};

// TODO: consider one component per file for easier file referencing
export const PasswordInputFields: FC = () => (
  <>
    <Heading title="PasswordInputField" />
    <PasswordInputFieldState1 />
    <PasswordInputFieldState2 />
    <PasswordInputFieldState3 />
    <PasswordInputFieldState4 />
  </>
);
