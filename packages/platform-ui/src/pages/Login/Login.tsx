import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { Link } from 'react-router-dom';
import { LoaderButton, PasswordInputField, TextInputField, validators, sleep } from '@percona/platform-core';
import { PASSWORD_MIN_LENGTH } from 'core';
import { Messages } from './Login.messages';
import { getLoginStyles } from './Login.styles';
import { Credentials } from './Login.types';

const { containsLowercase, containsNumber, containsUppercase, email, required } = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

const handleLoginInFormSubmit = async (credentials: Credentials) => {
  try {
    await sleep();
  } catch (e) {
    console.error(e);
  }
};

export const LoginPage: FC = () => {
  const theme = useTheme();
  const styles = getLoginStyles(theme);

  return (
    <Form onSubmit={handleLoginInFormSubmit}>
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
            className={styles.loginButton}
            type="submit"
            loading={submitting}
            disabled={!valid || submitting || pristine}
          >
            {Messages.signIn}
          </LoaderButton>
          <div className={styles.divider}>{Messages.or}</div>
          <Link to="/signup" data-qa="signup-action-button" className={styles.gotoSignup}>
            Sign up
          </Link>
        </form>
      )}
    </Form>
  );
};
