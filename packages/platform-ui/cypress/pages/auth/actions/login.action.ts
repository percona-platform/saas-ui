/// <reference types="cypress" />
import { User } from 'pages/common/interfaces/Auth';
import { INVALID_USER } from 'pages/common/constants';
import { authLoginAction } from '../../../../src/store/auth';

export const runLoginAction = (user: User) => {
  cy.window().its('store')
    .invoke('dispatch', authLoginAction.request(user));
  if (user === INVALID_USER.user) return;

  cy.wait('@signin').then(() => {
    cy.visit('/');
    cy.wait('@refresh');
  });
};
