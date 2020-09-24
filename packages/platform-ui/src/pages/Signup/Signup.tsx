import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  CheckboxField,
  LoaderButton,
  PasswordInputField,
  TextInputField,
  validators,
} from '@percona/platform-core';
import { PublicLayout } from 'components';
import { PASSWORD_MIN_LENGTH } from 'core';
import { Messages } from './Signup.messages';
import { getStyles } from './Signup.styles';
import { Credentials } from './Signup.types';
import { CheckboxLabel } from './CheckboxLabel';
import { signUp } from './Signup.service';
import { authSignupAction } from 'store/auth';
import { Routes } from 'core/routes';

const { containsLowercase, containsNumber, containsUppercase, email, required, requiredTrue } = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

export const SignupPage: FC = () => {
  const styles = useStyles(getStyles);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignupSubmit = async (credentials: Credentials) => {
    try {
      dispatch(authSignupAction.request(credentials));
      await signUp(credentials);
      dispatch(authSignupAction.success());
      toast.success(Messages.signUpSucceeded);
      history.replace(Routes.root);
    } catch (e) {
      dispatch(authSignupAction.failure(new Error(Messages.errors.signUpFailed)));
      toast.error(Messages.errors.signUpFailed);
      console.error(e);
    }
  };

  return (
    <PublicLayout>
      <Form onSubmit={handleSignupSubmit}>
        {({ handleSubmit, pristine, submitting, valid }: FormRenderProps) => (
          <form data-qa="signup-form" className={styles.form} onSubmit={handleSubmit}>
            <legend className={styles.legend}>{Messages.signUp}</legend>
            <TextInputField name="email" label={Messages.emailLabel} validators={emailValidators} required />
            <PasswordInputField
              name="password"
              label={Messages.passwordLabel}
              validators={passwordValidators}
              required
            />
            <CheckboxField name="consent" label={<CheckboxLabel />} validators={[requiredTrue]} />
            <LoaderButton
              data-qa="login-submit-button"
              className={styles.signupButton}
              type="submit"
              loading={submitting}
              disabled={!valid || submitting || pristine}
            >
              {Messages.signUp}
            </LoaderButton>
            <div className={styles.divider}>{Messages.or}</div>
            <Link to={Routes.login} data-qa="signup-action-button" className={styles.gotoLogin}>
              {Messages.signIn}
            </Link>
          </form>
        )}
      </Form>
    </PublicLayout>
  );
};
