import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { TestContainer } from 'components/TestContainer';
import { fireEvent } from '@testing-library/react';
import * as authApi from 'core/api/auth';
import { dataQa } from '@percona/platform-core';
import { AuthPB } from 'core';
import { MenuBar } from './MenuBar';

jest.spyOn(authApi, 'signOut').mockImplementation(() => Promise.resolve({} as AuthPB.SignOutResponse));

let container: HTMLElement;

describe('MenuBar', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  test('clicking on the profile logout button calls the logout API', async () => {
    act(() => {
      render(<TestContainer><MenuBar /></TestContainer>, container);
    });

    act(() => {
      fireEvent.click(container.querySelector(dataQa('menu-bar-profile-dropdown-toggle'))!);
    });

    await act(async () => {
      fireEvent.click(container.querySelector(dataQa('menu-bar-profile-dropdown-logout'))!);
    });

    expect(authApi.signOut).toBeCalledTimes(1);
  });
});
