/// <reference types="cypress" />
import { User } from 'pages/common/interfaces/Auth';
import { authLoginAction } from '../../../../src/store/auth';
import { INVALID_USER } from 'pages/common/constants';

export const runLoginAction = (user: User) => {
  cy.window().its('store')
    .invoke('dispatch', authLoginAction.request(user));

  cy.log(user.toString());

  if (user === INVALID_USER.user) {
    cy.log('GOT INVALID USER EXITING ...');

    return;
  }

  cy.log('moving ...');

  cy.wait('@signin').then(() => {
    cy.visit('/');
    cy.wait('@refresh');
  });
};
