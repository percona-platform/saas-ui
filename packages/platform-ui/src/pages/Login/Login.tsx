import React, { FC } from 'react';
import { Form } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { TextInputField, validators } from '@percona/platform-core';
import { Messages } from './Login.messages';
import { getLoginStyles } from './Login.styles';
import { Credentials } from './Login.types';

const { required, email, minLength: minLenthValidator } = validators;
const minLength = minLenthValidator(6);

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
        <form data-qa="sign-in-form" className={styles.form} onSubmit={handleSubmit}>
          <legend className={styles.legend}>{Messages.signIn}</legend>
          <TextInputField
            data-qa="sign-in-email-input"
            name="email"
            label={Messages.emailLabel}
            validators={[required, email]}
          />
          <TextInputField
            data-qa="sign-in-password-input"
            name="password"
            label={Messages.passwordLabel}
            validators={[required, minLength]}
          />
          <button
            data-qa="sign-in-submit-button"
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
