/// <reference types="cypress" />

export const setAliases = () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/RefreshSession',
    }).as('refresh');
    cy.route({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/SignIn',
    }).as('signin');

    cy.route({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/SignUp',
    }).as('signup');

    cy.route({
      method: 'POST',
      url: '/percona.platform.auth.v1.AuthAPI/SignOut',
    }).as('signout');
};
