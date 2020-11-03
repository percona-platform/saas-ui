import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Switch } from 'react-router-dom';
import { TestContainer } from 'components/TestContainer';
import * as authSelectors from 'store/auth/auth.selectors';
import { Routes } from 'core/routes';
import { history } from 'core/history';
import { PublicRoute } from './PublicRoute';

const getAuth = jest.spyOn(authSelectors, 'getAuth');

let container: HTMLElement;

describe('PublicRoute', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    getAuth.mockImplementation(() => ({
      authenticated: false,
      pending: false,
      authCheckCompleted: true,
    }));
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    jest.clearAllMocks();
  });

  test('shows children if the user is not authenticated', async () => {
    await act(async () => {
      render(<TestContainer><Switch><PublicRoute path="/public" exact><div data-test>test</div></PublicRoute></Switch></TestContainer>, container);
      history.replace('/public');
    });

    expect(container.querySelector('[data-test]')).not.toBe(null);
  });

  test('redirect to login if unauthenticated', async () => {
    getAuth.mockImplementation(() => ({
      authenticated: true,
      authCheckCompleted: true,
      email:'test@test.test',
      pending: false,
    }));

    await act(async () => {
      render(<TestContainer><Switch><PublicRoute path="/public"><div data-test>test</div></PublicRoute></Switch></TestContainer>, container);
      history.replace('/public');
    });

    expect(window.location.pathname).toEqual(Routes.root);
  });
});
