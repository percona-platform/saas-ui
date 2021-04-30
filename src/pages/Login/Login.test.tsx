import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import { LoginPage } from './Login';

jest.spyOn(authApi, 'signIn');

describe('Platform Login', () => {
  test('has login button disabled at start-up', async () => {
    render(<TestContainer><LoginPage /></TestContainer>);

    expect(await screen.findByTestId('login-submit-button')).toBeDisabled();
  });

  test('has a "forgot password" button', async () => {
    render(<TestContainer><LoginPage /></TestContainer>);

    expect(await screen.findByTestId('login-reset-password-button')).toBeDefined();
  });

  test('submit button is enabled after valid input in form fields', async () => {
    render(<TestContainer><LoginPage /></TestContainer>);

    const emailInput = await screen.findByTestId('email-text-input');
    const passwordInput = await screen.findByTestId('password-password-input');

    userEvent.type(emailInput, 'test@test.test');
    userEvent.type(passwordInput, 'FooBar123!!!');

    expect(await screen.findByTestId('login-submit-button')).not.toBeDisabled();
  });

  test('calls the login api on login button click', async () => {
    render(<TestContainer><LoginPage /></TestContainer>);

    const emailInput = await screen.findByTestId('email-text-input');
    const passwordInput = await screen.findByTestId('password-password-input');
    const loginButton = await screen.findByTestId('login-submit-button');

    userEvent.type(emailInput, 'test@test.test');
    userEvent.type(passwordInput, 'FooBar123!!!');

    userEvent.click(loginButton);

    expect(authApi.signIn).toBeCalledTimes(1);
  });
});
