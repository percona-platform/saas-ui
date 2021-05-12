/// <reference types="cypress" />

export const setAliases = () => {
    cy.server();

    cy.intercept({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/RefreshSession',
    }).as('refresh');

    cy.intercept({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/SignIn',
    }).as('signin');

    cy.intercept({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/SignUp',
    }).as('signup');

    cy.intercept({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/SignOut',
    }).as('signout');
};
