import React, { FC, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoaderButton, PasswordInputField, TextInputField, validators } from '@percona/platform-core';
import { PublicLayout } from 'components';
import { PASSWORD_MIN_LENGTH } from 'core/constants';
import { Routes } from 'core/routes';
import { Credentials } from 'store/types';
import { authLoginAction } from 'store/auth';
import { Messages } from './Login.messages';
import { getStyles } from './Login.styles';

const { containsLowercase, containsNumber, containsUppercase, email, required } = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

export const LoginPage: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();

  const handleLoginSubmit = useCallback(
    (credentials: Credentials) => {
      dispatch(authLoginAction.request(credentials));
    },
    [dispatch],
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
            <Link to={Routes.signup} data-qa="signup-action-button" className={styles.gotoSignup}>
              {Messages.signUp}
            </Link>
          </form>
        )}
      </Form>
    </PublicLayout>
  );
};
