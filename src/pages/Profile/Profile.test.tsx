import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestContainer } from 'components/TestContainer';
import * as authApi from 'core/api/auth';
import { ProfilePage } from './Profile';

jest.mock('core/api/auth');
jest.mock('store/auth/auth.selectors');

describe('Profile Page', () => {
  test('has save button disabled at start-up', async () => {
    render(<TestContainer><ProfilePage /></TestContainer>);

    expect(await screen.findByTestId('profile-submit-button')).toBeDisabled();
  });

  test('displays form values it gets from the store', async () => {
    render(<TestContainer><ProfilePage /></TestContainer>);

    expect(await screen.findByRole('form')).toHaveFormValues({
      firstName: 'Firstname',
      lastName: 'Lastname',
    });
  });

  test('calls the update profile API on save button click', async () => {
    render(<TestContainer><ProfilePage /></TestContainer>);

    const firstNameInput = await screen.findByTestId('firstName-text-input');
    const saveButton = await screen.findByTestId('profile-submit-button');

    userEvent.type(firstNameInput, 'Newfirstname');

    userEvent.click(saveButton);

    expect(authApi.updateProfile).toBeCalledTimes(1);
  });
});
