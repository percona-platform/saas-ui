/// <reference types="cypress" />
import { INVALID_USER, pageDetailsMap, Pages, VALID_USER } from 'pages/common/constants';
import { runFieldsValidationFlow } from 'pages/auth/flows/validation.flow';
import { runPageElementsFlow } from 'pages/auth/flows/checkElements.flow';
import { runSignUpFlow } from 'pages/auth/flows/auth.flow';
import { getNewUser } from 'pages/auth/utils/getNewUser';
import { runLoginAction } from 'pages/auth/actions/login.action';
import { profileIcon, userEmail } from 'pages/main/view/selectors';
import { setAliases } from 'pages/auth/requests/requests';
import { popUp } from 'pages/common/view/selectors';
import { loginForm, signupForm, signUpLink } from 'pages/auth/view/selectors';
import { runSignupAction } from 'pages/auth/actions/signup.action';

const newUser = getNewUser();

context('Sign Up', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.SignUp].url);
  });

  it('SAAS-T82 - should be able to see the signup form', () => {
    runPageElementsFlow(Pages.SignUp);
  });

  it('SAAS-T115 - should have validation for signup input fields', () => {
    runFieldsValidationFlow(Pages.SignUp);
  });

  it('SAAS-T83 - should be able to open the login page from the signup', () => {
    signUpLink().click();
    cy.url().should('contain', pageDetailsMap[Pages.Login].url);
    loginForm().isVisible();
  });

  it('SAAS-T78 - should be able to signup and login with new account', () => {
    runSignUpFlow(newUser);
    runLoginAction(newUser.user);
    userEmail().isVisible().hasText(newUser.user.email);
    profileIcon().isVisible();
  });

  it('SAAS-T85 - should see failed signup message', () => {
    runSignupAction(VALID_USER.user);
    popUp().isVisible().hasText(INVALID_USER.invalidSignUpMessage);
    signupForm().isVisible();
  });
});
