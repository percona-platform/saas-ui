import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { TextInputField, validators } from '@percona/platform-core';
import { LinkTo } from '../LinkTo';
import { getStyles } from '../styles';

export const TextInputFieldState1: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <legend className={styles.legend}>
            1. TextInputField, state: enabled, required
            <LinkTo src="/FormFields/TextInputFields.tsx#L8" />
          </legend>
          <TextInputField name="username" label="Username" required />
        </form>
      )}
    </Form>
  );
};

export const TextInputFieldState2: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <legend className={styles.legend}>
            2. TextInputField, state: enabled, not required
            <LinkTo src="/FormFields/TextInputFields.tsx#L27" />
          </legend>
          <TextInputField name="username" label="Username" />
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
          <legend className={styles.legend}>
            3. TextInputField, state: disabled, not required
            <LinkTo src="/FormFields/TextInputFields.tsx#L27" />
          </legend>
          <TextInputField name="username" label="Username" disabled />
        </form>
      )}
    </Form>
  );
};

const MIN_LENGH = 6;
const minLength = validators.minLength(MIN_LENGH);

export const TextInputFieldState4: FC = () => {
  const handleFormSubmit = () => { };
  const styles = useStyles(getStyles);

  return (
    <Form onSubmit={handleFormSubmit}>
      {({ handleSubmit }: FormRenderProps) => (
        <form data-qa="text-input-demo-form" className={styles.form} onSubmit={handleSubmit}>
          <legend className={styles.legend}>
            4. TextInputField, state: enabled, not required, minLengh(6)
            <LinkTo src="/FormFields/TextInputFields.tsx#L27" />
          </legend>
          <TextInputField name="username" label="Username" validators={[minLength]} />
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
