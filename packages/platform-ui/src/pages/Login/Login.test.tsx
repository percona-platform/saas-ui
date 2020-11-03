import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import { LoginPage } from './Login';

jest.spyOn(authApi, 'signIn');

let container: HTMLElement;

describe('Platform Login', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  test('has login button disabled at start-up', () => {
    act(() => {
      render(<TestContainer><LoginPage /></TestContainer>, container);
    });

    expect(container.querySelector('[data-qa="login-submit-button"]')?.hasAttribute('disabled')).toBe(true);
  });

  test('submit button is enabled after valid input in form fields', () => {
    act(() => {
      render(<TestContainer><LoginPage /></TestContainer>, container);
    });

    const emailInput = container.querySelector('[data-qa="email-text-input"]');
    const passwordInput = container.querySelector('[data-qa="password-password-input"]');

    fireEvent.change(emailInput!, { target: { value: 'test@test.test' } });
    fireEvent.change(passwordInput!, { target: { value: 'FooBar123!!!' } });

    expect(container.querySelector('[data-qa="login-submit-button"]')?.hasAttribute('disabled')).toBe(false);
  });

  test('calls the login api on login button click', async () => {
    act(() => {
      render(<TestContainer><LoginPage /></TestContainer>, container);
    });

    const emailInput = container.querySelector('[data-qa="email-text-input"]');
    const passwordInput = container.querySelector('[data-qa="password-password-input"]');
    const loginButton = container.querySelector('[data-qa="login-submit-button"]');

    fireEvent.change(emailInput!, { target: { value: 'test@test.test' } });
    fireEvent.change(passwordInput!, { target: { value: 'FooBar123!!!' } });

    await act(async () => {
      fireEvent.click(loginButton!);
    });

    expect(authApi.signIn).toBeCalledTimes(1);
  });
});
