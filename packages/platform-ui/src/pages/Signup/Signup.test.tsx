import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { fireEvent } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import { SignupPage } from './Signup';

let container: HTMLElement;

describe('Platform login::', () => {
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
      render(<TestContainer><SignupPage /></TestContainer>, container);
    });

    expect(container.querySelector('[data-qa="login-submit-button"]')?.hasAttribute('disabled')).toBe(true);
  });

  test('submit button is enabled after valid input in form fields', () => {
    act(() => {
      render(<TestContainer><SignupPage /></TestContainer>, container);
    });

    const emailInput = container.querySelector('[data-qa="email-text-input"]');
    const passwordInput = container.querySelector('[data-qa="password-password-input"]');
    const checkbox = container.querySelector('[data-qa="consent-checkbox-input"]');

    fireEvent.change(emailInput!, { target: { value: 'test@test.test' } });
    fireEvent.change(passwordInput!, { target: { value: 'FooBar123!!!' } });
    fireEvent.click(checkbox!);

    expect(container.querySelector('[data-qa="login-submit-button"]')?.hasAttribute('disabled')).toBe(false);
  });
});
