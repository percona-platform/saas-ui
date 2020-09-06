import React, { FC, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { Link, useHistory } from 'react-router-dom';
import { LoaderButton, PasswordInputField, TextInputField, validators, sleep } from '@percona/platform-core';
import { PublicLayout } from 'components';
import { PASSWORD_MIN_LENGTH } from 'core';
import { store } from 'store';
import { Messages } from './Login.messages';
import { getLoginStyles } from './Login.styles';
import { authLoginAction } from 'store/auth';
import { Credentials } from 'store/types';

const { containsLowercase, containsNumber, containsUppercase, email, required } = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

export const LoginPage: FC = () => {
  const theme = useTheme();
  const styles = getLoginStyles(theme);
  const history = useHistory();

  const handleLoginSubmit = useCallback(
    async (credentials: Credentials) => {
      try {
        store.dispatch(authLoginAction.request(credentials));
        await sleep();
        store.dispatch(authLoginAction.success());
        history.replace('/');
      } catch (e) {
        store.dispatch(authLoginAction.failure(new Error('Could not authenticate')));
        console.error(e);
      }
    },
    [history],
  );

  return (
    <PublicLayout>
      <Form onSubmit={handleLoginSubmit}>
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
    </PublicLayout>
  );
};
