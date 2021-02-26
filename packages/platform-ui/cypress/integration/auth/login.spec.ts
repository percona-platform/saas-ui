/// <reference types="cypress" />
import { loginForm, signupForm, signUpLink } from 'pages/auth/view/selectors';
import { runFieldsValidationFlow } from 'pages/auth/flows/validation.flow';
import { runLoginFlow } from 'pages/auth/flows/auth.flow';
import { runPageElementsFlow } from 'pages/auth/flows/checkElements.flow';
import { INVALID_USER, pageDetailsMap, Pages } from 'pages/common/constants';
import { setAliases } from 'pages/auth/requests/requests';
import { runLoginAction } from 'pages/auth/actions/login.action';
import { popUp } from 'pages/common/view/selectors';
import { runSignupAction } from 'pages/auth/actions/signup.action';
import { getNewUser } from 'pages/auth/utils/getNewUser';

const newUser = getNewUser();

context('Login', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
  });

  it('SAAS-T82 - should be able to see the login form', () => {
    runPageElementsFlow(Pages.Login);
  });

  it('SAAS-T114 - should have validation for login input fields', () => {
    runFieldsValidationFlow(Pages.Login);
  });

  it('SAAS-T83 - should be able to open the signup page from the login', () => {
    signUpLink().click();
    cy.url().should('contain', pageDetailsMap[Pages.SignUp].url);
    signupForm().isVisible();
  });

  it('SAAS-T111 SAAS-T81 - should be able to login', () => {
    runSignupAction(newUser.user);
    popUp().siblings('button').click();
    runLoginFlow(newUser);
  });

  it('SAAS-T86 - should see invalid username or password message', () => {
    runLoginAction(INVALID_USER.user);
    popUp().isVisible().hasText(INVALID_USER.invalidLoginMessage);
    loginForm().isVisible();
  });
});
