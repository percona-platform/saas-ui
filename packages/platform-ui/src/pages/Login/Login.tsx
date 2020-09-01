import React, { FC } from 'react';
import { Form } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { TextInputField, validators } from '@percona/platform-core';
import { Messages } from './Login.messages';
import { getLoginStyles } from './Login.styles';
import { Credentials } from './Login.types';

const {
  containsLowercase,
  containsNumber,
  containsUppercase,
  email,
  minLength: minLenthValidator,
  required,
} = validators;
const minLength = minLenthValidator(8);

export const LoginPage: FC = () => {
  const theme = useTheme();
  const styles = getLoginStyles(theme);

  const handleSignInFormSubmit = async (credentials: Credentials) => {
    try {
      await Promise.resolve(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleSignInFormSubmit}>
      {({ handleSubmit, pristine, submitting, valid }: any) => (
        <form data-qa="login-form" className={styles.form} onSubmit={handleSubmit}>
          <legend className={styles.legend}>{Messages.signIn}</legend>
          <TextInputField name="email" label={Messages.emailLabel} validators={[required, email]} required />
          <TextInputField
            name="password"
            label={Messages.passwordLabel}
            validators={[required, minLength, containsNumber, containsLowercase, containsUppercase]}
            required
          />
          <button
            data-qa="login-submit-button"
            className={styles.signInButton}
            type="submit"
            disabled={!valid || submitting || pristine}
          >
            {Messages.signIn}
          </button>
        </form>
      )}
    </Form>
  );
};
