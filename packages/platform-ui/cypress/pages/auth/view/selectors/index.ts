/// <reference types="cypress" />
// to specify data-qa attribute selector add prefix 'qa:' to the locator

export const loginForm = () => cy.get('qa:login-form');
export const signupForm = () => cy.get('qa:signup-form');
export const emailFieldLabel = () => cy.get('qa:email-field-label');
export const emailField = () => cy.get('qa:email-text-input');
export const emailValidation = () => cy.get('qa:email-field-error-message');
export const passwordFieldLabel = () => cy.get('qa:password-field-label');
export const passwordField = () => cy.get('qa:password-password-input');
export const passwordValidation = () => cy.get('qa:password-field-error-message');
export const submitButton = () => cy.get('qa:login-submit-button');
export const signUpLink = () => cy.get('qa:signup-action-button');
export const termsCheckbox = () => cy.get('qa:consent-checkbox-input');
export const termsText = () => cy.get('qa:consent-field-label');
export const termsValidation = () => cy.get('qa:consent-field-error-message');
