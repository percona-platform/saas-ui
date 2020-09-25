import React, { FC, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as grpcWeb from 'grpc-web';
import { toast } from 'react-toastify';
import { LoaderButton, PasswordInputField, TextInputField, validators } from '@percona/platform-core';
import { PublicLayout } from 'components';
import { PASSWORD_MIN_LENGTH } from 'core/constants';
import { Routes } from 'core/routes';
import { Credentials } from 'store/types';
import { authLoginAction } from 'store/auth';
import { Messages } from './Login.messages';
import { getStyles } from './Login.styles';
import { signIn } from './Login.service';

const { containsLowercase, containsNumber, containsUppercase, email, required } = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

export const LoginPage: FC = () => {
  const styles = useStyles(getStyles);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLoginSubmit = useCallback(
    async (credentials: Credentials) => {
      try {
        dispatch(authLoginAction.request(credentials));
        await signIn(credentials);
        toast.success(`${Messages.signInSucceeded} ${credentials.email}`);
        dispatch(authLoginAction.success());
        history.replace(Routes.root);
      } catch (e) {
        dispatch(authLoginAction.failure(new Error(Messages.errors.signInFailed)));
        if (e.code === grpcWeb.StatusCode.INVALID_ARGUMENT) {
          toast.error(e.message);
        } else {
          toast.error(Messages.errors.signInFailed);
          console.error(e);
        }
      }
    },
    [history, dispatch],
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
