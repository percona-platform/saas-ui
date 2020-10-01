/// <reference types="cypress" />
import { pageDetailsMap, Pages } from 'pages/common/constants';
import { runFieldsValidationFlow } from 'pages/auth/flows/validation.flow';
import { runPageElementsFlow } from 'pages/auth/flows/checkElements.flow';
import { runLoginFlow, runSignUpFlow } from 'pages/auth/flows/auth.flow';
import { getNewUser } from 'pages/auth/utils/getNewUser';

const newUser = getNewUser();

context('Sign Up', () => {
  beforeEach(() => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
  });

  it('should be able to see the signup form', () => {
    runPageElementsFlow(Pages.SignUp);
  });

  it('should have validation for signup input fields', () => {
    runFieldsValidationFlow(Pages.SignUp);
  });

  it('should be able to signup and login with new account', () => {
    runSignUpFlow(newUser);
    runLoginFlow(newUser);
  });
});
