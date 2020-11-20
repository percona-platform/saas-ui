import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import * as authSelectors from 'store/auth/auth.selectors';
import { history } from 'core/history';
import { Main } from './Main';
import { Messages } from '../../pages/NotFound/NotFound.messages';

const getAuth = jest.spyOn(authSelectors, 'getAuth');

jest.spyOn(authApi, 'refreshSession');
jest.spyOn(console, 'error').mockImplementation(() => {});

let container: HTMLElement;

describe('Main Page', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    getAuth.mockImplementation(() => ({
      email: 'test@test.test',
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

  test('shows an empty page while fetching user data', async () => {
    getAuth.mockImplementation(() => ({
      authenticated: false,
      pending: true,
      authCheckCompleted: false,
    }));

    await act(async () => {
      render(<TestContainer><Main /></TestContainer>, container);
    });

    expect(container.innerHTML).toEqual('');
  });

  test('shows a non-empty page after user data have been fetched', async () => {
    await act(async () => {
      render(<TestContainer><Main /></TestContainer>, container);
    });

    expect(container.innerHTML).not.toEqual('');
  });

  test('calls the refresh session api at start-up', async () => {
    await act(async () => {
      render(<TestContainer><Main /></TestContainer>, container);
    });
  });

  test('show a page-not-found message for not existing routes', async () => {
    await act(async () => {
      render(<TestContainer><Main /></TestContainer>, container);
      history.replace('/some-non-existing-page');
    });

    expect(container.textContent).toEqual(Messages.pageNotFound);
  });
});
