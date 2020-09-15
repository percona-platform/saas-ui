/// <reference types="cypress" />
import stubServices from '../../support/stub.services';
import { authLocators as auth } from './locators'

context('Login', () => {

  beforeEach(() => {
    stubServices();
    cy.visit('/signup');
  });

  it('should be able to see the signup form', () => {
    cy.get(auth.signupForm).should('be.visible');
    cy.get(auth.emailFieldLabel).should('contain', 'Email *');
    cy.get(auth.emailField).should('be.visible');
    cy.get(auth.passwordFieldLabel).should('contain', 'Password *');
    cy.get(auth.passwordField).should('be.visible');
    cy.get(auth.termsCheckbox).should('be.visible');
    cy.get(auth.termsText).should('be.visible')
        .should('have.text', 'Check here to indicate that you have read and agree to the  Terms of Service and Privacy Policy')
        .find('a').should('have.attr', 'href', 'https://per.co.na/pmm/platform-terms')
        .next().should('have.attr', 'href','https://per.co.na/pmm/platform-privacy');
    cy.get(auth.submitButton).should('be.visible').should('be.disabled');
    cy.get(auth.signUpLink).should('have.attr', 'href', '/login');
  });

  it('should have validation for signup input fields', () => {
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
    cy.get(auth.submitButton).should('be.visible').should('be.disabled');
    cy.get(auth.emailField).clear().type('valid@email.com');
    cy.get(auth.termsCheckbox).click({ force: true });
    cy.get(auth.submitButton).should('be.enabled');
    cy.get(auth.termsCheckbox).click({ force: true });
    cy.get(auth.passwordField).click();
    cy.get(auth.termsValidation).should('have.text', 'Required field');
  });

  it('should be able to signup', () => {
    const email = 'valid@email.com';
    const password = 'Password123';
    cy.get(auth.submitButton).should('be.visible').should('be.disabled');
    cy.get(auth.emailField).clear().type(email);
    cy.get(auth.emailValidation).should('have.text', '');
    cy.get(auth.passwordField).type(password);
    cy.get(auth.passwordValidation).should('have.text', '');
    cy.get(auth.termsCheckbox).click({ force: true });
    cy.get(auth.submitButton).should('be.visible').should('be.enabled').click();
    cy.popUpContains('You have successfully created your credentials');
    cy.url().should('contain', '/login')
  });
});
