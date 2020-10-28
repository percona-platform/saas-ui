import React, { FC, useCallback } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useStyles } from '@grafana/ui';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown,
  LoaderButton, PasswordInputField, TextInputField, validators,
} from '@percona/platform-core';
import { PublicLayout } from 'components';
import { PASSWORD_MIN_LENGTH } from 'core/constants';
import { Routes } from 'core/routes';
import { Credentials } from 'store/types';
import { authLoginAction, getAuth } from 'store/auth';
import { Messages } from './Login.messages';
import { getStyles } from './Login.styles';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const {
  containsLowercase, containsNumber, containsUppercase, email, required,
} = validators;
const minLength = validators.minLength(PASSWORD_MIN_LENGTH);

const emailValidators = [required, email];
const passwordValidators = [required, minLength, containsNumber, containsLowercase, containsUppercase];

const Toggle = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button
    type="button"
    aria-label="Toggle visibility"
    ref={ref}
    {...props}
    style={{
      backgroundColor: '#f1f1f1',
      border: 'none',
      minWidth: '70px',
      minHeight: '60px',
    }}>
    Toggle
  </button >
));

export const LoginPage: FC = () => {
  const styles = useStyles(getStyles);
  const dispatch = useDispatch();
  const { pending } = useSelector(getAuth);

  const handleLoginSubmit = useCallback(
    (credentials: Credentials) => {
      dispatch(authLoginAction.request(credentials));
    },
    [dispatch],
  );

  const onDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
  };
  const onAnchorClick = (event: React.MouseEvent<HTMLDivElement>) => {
  };

  return (
    <>
      <Dropdown toggle={Toggle}>
        <div className="foo" onClick={onDivClick as any}>Login</div>
        <div onClick={onAnchorClick as any}>Logout</div>
      </Dropdown>
      <PublicLayout>
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
                inputProps={{ autoComplete: 'off' }}
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
    </>
  );
};
