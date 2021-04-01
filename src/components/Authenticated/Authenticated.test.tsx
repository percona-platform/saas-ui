import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import { Authenticated } from './Authenticated';

jest.spyOn(authApi, 'signOut');

jest.mock('store/auth/auth.selectors', () => ({
  getAuth: () => ({
    email: 'test@test.test',
    pending: false,
    authenticated: true,
  }),
}));

let container: HTMLElement;

describe('Authenticated Page', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  test('shows the email of the authenticated user', async () => {
    await act(async () => {
      render(<TestContainer><Authenticated /></TestContainer>, container);
    });

    expect(container.querySelector('[data-qa="user-email"]')?.textContent).toEqual('test@test.test');
  });
});
