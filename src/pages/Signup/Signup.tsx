import React, { FC } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CheckboxField,
  LoaderButton,
  TextInputField,
  validators,
} from '@percona/platform-core';
import { PublicLayout } from 'components';
import { authSignupAction, getAuth } from 'store/auth';
import { Routes } from 'core/routes';
import { MAX_NAME_LENGTH } from 'core/constants';
import { SignupPayload } from 'store/types';
import { Messages } from './Signup.messages';
import { getStyles } from './Signup.styles';
import { CheckboxLabel } from './CheckboxLabel';

const {
  email, required, requiredTrue, maxLength,
} = validators;

const emailValidators = [required, email];
const nameValidators = [required, maxLength(MAX_NAME_LENGTH)];

export const SignupPage: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { pending } = useSelector(getAuth);

  const handleSignupSubmit = async (credentials: SignupPayload) => {
    dispatch(authSignupAction.request(credentials));
  };

  return (
    <PublicLayout>
      <Form onSubmit={handleSignupSubmit}>
        {({ handleSubmit, pristine, valid }: FormRenderProps) => (
          <form data-qa="signup-form" className={styles.form} onSubmit={handleSubmit}>
            <legend className={styles.legend}>{Messages.signUp}</legend>
            <TextInputField name="email" label={Messages.emailLabel} validators={emailValidators} required />
            <TextInputField name="firstName" label={Messages.firstName} validators={nameValidators} required />
            <TextInputField name="lastName" label={Messages.lastName} validators={nameValidators} required />
            <CheckboxField name="consent" label={<CheckboxLabel />} validators={[requiredTrue]} />
            <LoaderButton
              data-qa="login-submit-button"
              className={styles.signupButton}
              type="submit"
              loading={pending}
              disabled={!valid || pending || pristine}
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
