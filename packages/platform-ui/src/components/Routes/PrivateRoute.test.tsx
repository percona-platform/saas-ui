import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Switch } from 'react-router';
import { TestContainer } from 'components/TestContainer';
import { PrivateRoute } from './PrivateRoute';
import * as authSelectors from 'store/auth/auth.selectors';
import { Routes } from 'core/routes';

const getAuth = jest.spyOn(authSelectors, 'getAuth');

let container: HTMLElement;

describe('PrivateRoute', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    getAuth.mockImplementation(() => ({
      email:'test@test.test',
      authenticated: true,
      pending: false,
      authCheckCompleted: true,
    }));
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    jest.clearAllMocks();
  });

  test('shows children if the user is authenticated', async () => {
    await act(async () => {
      render(<TestContainer><Switch><PrivateRoute path="/" exact><div data-test>test</div></PrivateRoute></Switch></TestContainer>, container);
    });

    expect(container.querySelector('[data-test]')).not.toBe(null);
  });

  test('redirect to login if unauthenticated', async () => {
    getAuth.mockImplementation(() => ({
      authenticated: false,
      pending: false,
      authCheckCompleted: true,
    }));

    await act(async () => {
      render(<TestContainer><Switch><PrivateRoute path="/" exact><div data-test>test</div></PrivateRoute></Switch></TestContainer>, container);
    });

    expect(window.location.pathname).toEqual(Routes.login);
  });
});
