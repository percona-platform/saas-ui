import React from 'react';
import { act } from 'react-dom/test-utils';
import { dataQa } from '@percona/platform-core';
import { render, fireEvent } from '@testing-library/react';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import { ProfilePage } from './Profile';

jest.spyOn(authApi, 'getProfile');
jest.spyOn(authApi, 'updateProfile');

jest.mock('store/auth/auth.selectors', () => ({
  getAuth: () => ({
    email: 'test@test.test',
    firstName: 'Firstname',
    lastName: 'Lastname',
    pending: false,
    authenticated: true,
  }),
}));

let container: HTMLElement;

describe('Profile Page', () => {
  test('has save button disabled at start-up', async () => {
    await act(async () => {
      ({ container } = render(<TestContainer><ProfilePage /></TestContainer>));
    });

    expect(container.querySelector(dataQa('profile-submit-button'))?.hasAttribute('disabled')).toBe(true);
  });

  test('calls the update profile API on save button click', async () => {
    await act(async () => {
      ({ container } = render(<TestContainer><ProfilePage /></TestContainer>));
    });

    const firstNameInput = container.querySelector(dataQa('firstName-text-input'));
    const saveButton = container.querySelector(dataQa('profile-submit-button'));

    fireEvent.change(firstNameInput!, { target: { value: 'Newfirstname' } });

    await act(async () => {
      fireEvent.click(saveButton!);
    });

    expect(authApi.updateProfile).toBeCalledTimes(1);
  });
});
