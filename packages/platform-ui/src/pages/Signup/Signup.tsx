import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { Link } from 'react-router-dom';
import {
  CheckboxField,
  LoaderButton,
  PasswordInputField,
  TextInputField,
  validators,
  sleep,
} from '@percona/platform-core';
import { PublicLayout } from 'components';
import { PASSWORD_MIN_LENGTH } from 'core';
import { Messages } from './Signup.messages';
import { getStyles } from './Signup.styles';
import { Credentials } from './Signup.types';
import { CheckboxLabel } from './CheckboxLabel';

const { containsLowercase, containsNumber, containsUppercase, email, required, requiredTrue } = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

const handleSignInFormSubmit = async (credentials: Credentials) => {
  try {
    await sleep();
  } catch (e) {
    console.error(e);
  }
};

export const SignupPage: FC = () => {
  const styles = useStyles(getStyles);

  return (
    <PublicLayout>
      <Form onSubmit={handleSignInFormSubmit}>
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
            <Link to="/login" data-qa="signup-action-button" className={styles.gotoLogin}>
              Login
            </Link>
          </form>
        )}
      </Form>
    </PublicLayout>
  );
};
