import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useTheme, Button, LinkButton } from '@grafana/ui';
import {
  CheckboxField,
  LoaderButton,
  PasswordInputField,
  TextInputField,
  validators,
  sleep,
} from '@percona/platform-core';
import { PASSWORD_MIN_LENGTH, PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from 'core';
import { Messages } from './Login.messages';
import { getLoginStyles } from './Login.styles';
import { Credentials } from './Login.types';

const { containsLowercase, containsNumber, containsUppercase, email, required } = validators;
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

export const LoginPage: FC = () => {
  const theme = useTheme();
  const styles = getLoginStyles(theme);
  const CheckboxLabel: FC = () => (
    <span data-qa="sign-up-agreement-checkbox-label" className={styles.checkboxLabel}>
      {`${Messages.agreementFirstPart} `}
      <LinkButton className={styles.link} variant="link" href={TERMS_OF_SERVICE_URL}>
        {Messages.termsOfService}
      </LinkButton>
      {` ${Messages.agreementSecondPart} `}
      <LinkButton className={styles.link} variant="link" href={PRIVACY_POLICY_URL}>
        {Messages.privacyPolicy}
      </LinkButton>
    </span>
  );

  return (
    <Form onSubmit={handleSignInFormSubmit}>
      {({ handleSubmit, pristine, submitting, valid }: FormRenderProps) => (
        <form data-qa="login-form" className={styles.form} onSubmit={handleSubmit}>
          <legend className={styles.legend}>{Messages.signIn}</legend>
          <TextInputField
            name="email"
            label={Messages.emailLabel}
            validators={emailValidators}
            alwaysShowError
            required
          />
          <PasswordInputField
            name="password"
            label={Messages.passwordLabel}
            validators={passwordValidators}
            alwaysShowError
            required
          />
          <CheckboxField name="consent" label={<CheckboxLabel />} />

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
