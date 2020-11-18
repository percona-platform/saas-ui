/// <reference types="cypress" />
import { loginForm, signUpLink } from 'pages/auth/view/selectors';
import { runFieldsValidationFlow } from 'pages/auth/flows/validation.flow';
import { runLoginFlow } from 'pages/auth/flows/auth.flow';
import { runPageElementsFlow } from 'pages/auth/flows/checkElements.flow';
import { INVALID_USER, pageDetailsMap, Pages, VALID_USER } from 'pages/common/constants';
import { setAliases } from 'pages/auth/requests/requests';
import { runLoginAction } from 'pages/auth/actions/login.action';
import { popUp } from 'pages/common/view/selectors';

context('Login', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
  });

  it('should be able to see the login form', () => {
    runPageElementsFlow(Pages.Login);
  });

  it('should have validation for login input fields', () => {
    runFieldsValidationFlow(Pages.Login);
  });

  it('should be able to open the signup page from the login', () => {
    signUpLink().click();
    cy.url().should('contain', pageDetailsMap[Pages.SignUp].url);
  });

  it('should be able to login', () => {
    runLoginFlow(VALID_USER);
  });

  it('should see invalid username or password message', () => {
    runLoginAction(INVALID_USER.user);
    popUp().isVisible().hasText(INVALID_USER.invalidLoginMessage);
    loginForm().isVisible();
  });
});
