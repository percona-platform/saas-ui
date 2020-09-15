/// <reference types="cypress" />
import stubServices from '../../support/stub.services';
import { authLocators as auth } from './locators'

context('Login', () => {

  beforeEach(() => {
    stubServices();
    cy.log(Cypress.config());
    cy.visit('/');
  });

  it('should be able to see the login form', () => {
    cy.get(auth.loginForm).should('be.visible');
    cy.get(auth.emailFieldLabel).should('contain', 'Email *');
    cy.get(auth.emailField).should('be.visible');
    cy.get(auth.passwordFieldLabel).should('contain', 'Password *');
    cy.get(auth.passwordField).should('be.visible');
    cy.get(auth.loginButton).should('be.visible').should('be.disabled');
    cy.get(auth.signUpLink).should('have.attr', 'href', '/signup');
  });

  it('should have validation for login input fields', () => {
    cy.get(auth.emailFieldLabel).click();
    cy.get(auth.passwordField).click();
    cy.get(auth.emailValidation).should('have.text', 'Required field');
    cy.get(auth.emailField).type('some email');
    cy.get(auth.passwordValidation).should('have.text', 'Required field');
    cy.get(auth.emailValidation).should('have.text', 'Invalid email address');
    cy.get(auth.passwordField).type('test');
    cy.get(auth.passwordValidation).should('have.text', 'Must contain at least 10 characters');
    cy.get(auth.passwordField).type('testqwerty');
    cy.get(auth.passwordValidation).should('have.text', 'Must include at least one number');
    cy.get(auth.passwordField).type('1');
    cy.get(auth.passwordValidation).should('have.text', 'Must include at least one uppercase letter');
    cy.get(auth.passwordField).type('P');
    cy.get(auth.passwordValidation).should('have.text', '');
    cy.get(auth.loginButton).should('be.visible').should('be.disabled');
    cy.get(auth.emailField).clear().type('valid@email.com');
    cy.get(auth.passwordValidation).should('have.text', '');
    cy.get(auth.loginButton).should('be.visible').should('be.enabled').click();
  });
});
