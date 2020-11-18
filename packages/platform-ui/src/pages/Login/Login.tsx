import React, { FC, useCallback, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, useStyles } from '@grafana/ui';
import {
  LoaderButton, PasswordInputField, TextInputField, validators, Modal,
} from '@percona/platform-core';
import { authLoginAction, getAuth } from 'store/auth';
import { Credentials } from 'store/types';
import { PASSWORD_MIN_LENGTH } from 'core/constants';
import { PublicLayout } from 'components';
import { Routes } from 'core/routes';
import { Messages } from './Login.messages';
import { getStyles } from './Login.styles';

const {
  containsLowercase, containsNumber, containsUppercase, email, required,
} = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

export const LoginPage: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { pending } = useSelector(getAuth);
  const [isVisible, setVisible] = useState(false);

  const handleLoginSubmit = useCallback(
    (credentials: Credentials) => {
      dispatch(authLoginAction.request(credentials));
    },
    [dispatch],
  );

  return (
    <PublicLayout>
      <Button onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        title="Test modal"
        isVisible={isVisible}
        onClose={() => setVisible(false)}
      >
        <div className={styles.stepProgressWrapper}>
          <textarea rows={10} defaultValue={`
            this is row 1
            this is row 2
            this is row 3
            this is row 4
            this is row 5
          `}/>
        </div>
      </Modal>
      <Form onSubmit={handleLoginSubmit}>
        {({ handleSubmit, pristine, valid }: FormRenderProps) => (
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
              loading={pending}
              disabled={!valid || pending || pristine}
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
