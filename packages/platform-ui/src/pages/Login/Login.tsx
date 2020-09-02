import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useTheme, Button } from '@grafana/ui';
import { LoaderButton, PasswordInputField, TextInputField, validators, sleep } from '@percona/platform-core';
import { Messages } from './Login.messages';
import { getLoginStyles } from './Login.styles';
import { Credentials } from './Login.types';

const { containsLowercase, containsNumber, containsUppercase, email, required } = validators;
const minLength = validators.minLength(8);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

export const LoginPage: FC = () => {
  const theme = useTheme();
  const styles = getLoginStyles(theme);

  const handleSignInFormSubmit = async (credentials: Credentials) => {
    try {
      await sleep();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleSignInFormSubmit}>
      {({ handleSubmit, pristine, submitting, valid }: FormRenderProps) => (
        <form data-qa="login-form" className={styles.form} onSubmit={handleSubmit}>
          <legend className={styles.legend}>{Messages.signIn}</legend>
          <TextInputField name="email" label={Messages.emailLabel} validators={emailValidators} required />
          <PasswordInputField
            name="password"
            label={Messages.passwordLabel}
            validators={passwordValidators}
            required
          />
          <LoaderButton
            data-qa="login-submit-button"
            className={styles.signInButton}
            type="submit"
            loading={submitting}
            disabled={!valid || submitting || pristine}
          >
            {Messages.signIn}
          </LoaderButton>
          <div className={styles.divider}>{Messages.or}</div>
          <Button
            data-qa="signup-action-button"
            className={styles.signInButton}
            type="button"
            variant="link"
            disabled={submitting}
          >
            {Messages.signUp}
          </Button>
        </form>
      )}
    </Form>
  );
};
