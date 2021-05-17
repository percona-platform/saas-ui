import { authLoginAction, authSignupAction } from '@src/store/auth/auth.reducer';


Cypress.Commands.add('runLoginAction',
  (user, shouldFail) => {
    cy.window().its('store')
      .invoke('dispatch', authLoginAction.request(user));
    if (shouldFail) return;

    cy.wait('@signin').then(() => {
      cy.visit('/');
      cy.wait('@refresh');
    });
  },
);

Cypress.Commands.add('runSignUpAction',
  (user) => {
    cy.window().its('store')
      .invoke('dispatch', authSignupAction.request(user));
    cy.wait('@signup');
  },
);
