import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useTheme } from '@grafana/ui';
import { Link } from 'react-router-dom';
import {
  CheckboxField,
  LoaderButton,
  PasswordInputField,
  TextInputField,
  validators,
} from '@percona/platform-core';
import { PASSWORD_MIN_LENGTH } from 'core';
import { Messages } from './Signup.messages';
import { getLoginStyles } from './Signup.styles';
import { Credentials } from './Signup.types';
import { CheckboxLabel } from './CheckboxLabel';
import { AuthAPIClient } from "core/apis/Auth_apiServiceClientPb";
import { SignUpRequest } from "core/apis/auth_api_pb";

const { containsLowercase, containsNumber, containsUppercase, email, required, requiredTrue } = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

const handleSignInFormSubmit = async (credentials: Credentials) => {
  try {
    const apiClient = new AuthAPIClient(
      "https://platform-dev.percona.com",
      null,
      null
    );

    const request = new SignUpRequest();

    request.setEmail(credentials.email);
    request.setPassword(credentials.password);

    const call = apiClient.signUp(request, {}, (err, resp) => {
      console.log(err, resp);
    });
    call.on("status", (status: any) => {
      console.log(status);
    });
  } catch (e) {
    console.error(e);
  }
};

export const SignupPage: FC = () => {
  const theme = useTheme();
  const styles = getLoginStyles(theme);

  return (
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
  );
};
