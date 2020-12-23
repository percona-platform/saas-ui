import React from 'react';
import { TestContainer } from 'components/TestContainer';
import { act, fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import * as authApi from 'core/api/auth';
import { dataQa } from '@percona/platform-core';
import { AuthPB } from 'core';
import { MenuBar } from './MenuBar';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.spyOn(authApi, 'signOut').mockImplementation(() => Promise.resolve({} as AuthPB.SignOutResponse));

const mockAppState = {
  auth: {
    authenticated: true,
  },
};

describe('MenuBar', () => {
  beforeEach(() => {
    (useSelector as jest.Mock<any, any>).mockImplementation((callback) => {
      return callback(mockAppState);
    });
  });

  afterEach(() => {
    (useSelector as jest.Mock<any, any>).mockClear();
  });

  test('clicking on the profile logout button calls the logout API', async () => {
    const { container } = render(<TestContainer><MenuBar /></TestContainer>);

    act(() => {
      fireEvent.click(container.querySelector(dataQa('menu-bar-profile-dropdown-toggle'))!);
    });

    await act(async () => {
      fireEvent.click(container.querySelector(dataQa('menu-bar-profile-dropdown-logout'))!);
    });

    expect(authApi.signOut).toBeCalledTimes(1);
  });

  test('unathenticated user should not see the profile menu', async () => {
    (useSelector as jest.Mock<any, any>).mockImplementation((callback) => {
      return callback({
        auth: { authenticated: false },
      });
    });

    const { container } = render(<TestContainer><MenuBar /></TestContainer>);

    expect(container.querySelector(dataQa('menu-bar-profile-dropdown-logout'))).toEqual(null);
  });
});
