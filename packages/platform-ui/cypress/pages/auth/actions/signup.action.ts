/// <reference types="cypress" />
import { User } from 'pages/common/interfaces/Auth';
import { authSignupAction } from '@src/store/auth';

export const runSignupAction = (user: User) => {
  cy.window().its('store')
    .invoke('dispatch', authSignupAction.request(user));
  cy.wait('@signup');
};
