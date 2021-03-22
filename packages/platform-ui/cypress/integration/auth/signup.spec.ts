/// <reference types="cypress" />
import { EXISTING_USER, INVALID_USER, pageDetailsMap, Pages } from 'pages/common/constants';
import { runFieldsValidationFlow } from 'pages/auth/flows/validation.flow';
import { runPageElementsFlow } from 'pages/auth/flows/checkElements.flow';
import { runLoginFlow, runSignUpFlow } from 'pages/auth/flows/auth.flow';
import { getUser } from 'pages/auth/utils/getUser';
import { setAliases } from 'pages/auth/requests/requests';
import { popUp } from 'pages/common/view/selectors';
import { loginForm, signupForm, signUpLink, submitButton } from 'pages/auth/view/selectors';
import { runSignupAction } from 'pages/auth/actions/signup.action';
import { fillEmailPassword } from 'pages/auth/view/behavior/auth';

const newUser = getUser();

context('Sign Up', () => {
  beforeEach(() => {
    setAliases();
  });

  it('SAAS-T82 - should be able to see the signup form', () => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
    runPageElementsFlow(Pages.SignUp);
  });

  it('SAAS-T115 - should have validation for signup input fields', () => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
    runFieldsValidationFlow(Pages.SignUp);
  });

  it('SAAS-T83 - should be able to open the login page from the signup', () => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
    signUpLink().click();
    cy.url().should('contain', pageDetailsMap[Pages.Login].url);
    loginForm().isVisible();
  });

  it('should be able to see message about activation link was sent', () => {
    cy.task('setEmail', newUser.user.email);
    cy.task('setPassword', newUser.user.password);

    cy.visit(pageDetailsMap[Pages.SignUp].url);
    runSignUpFlow(newUser);
  });

  it('should not be able to login with not activated account', () => {
    cy.visit(pageDetailsMap[Pages.Login].url);
    cy.task('getUser').then(({ userEmail, userPassword }) => {
      newUser.user.email = userEmail;
      newUser.user.password = userPassword;
      fillEmailPassword(newUser.user);
      submitButton().isVisible().isEnabled().click();
      popUp().isVisible().hasText(INVALID_USER.invalidLoginMessage);
      loginForm().isVisible();
    });
  });

  it('should be able to activate account', { baseUrl: null}, () => {
    cy.task('getUser').then(({ userEmail, userPassword }) => {
      cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SAAS_SERVER_ID'), {sentTo: userEmail}, {timeout: 20000})
        .then((message) => {
          const link = message.html!.links!
            .find(({ text }) => text === '  Activate Okta Account  ')!.href;

          cy.visit(link!);
          cy.get('[name="newPassword"]').type(userPassword);
          cy.get('[name="verifyPassword"]').type(userPassword);
          cy.get('#next-button').click();
          cy.get('.migration-modal').should('be.visible');
        });
    });
  });

  it('should be able to login with new account', () => {
    cy.visit(pageDetailsMap[Pages.Login].url);
    cy.task('getUser').then(({ userEmail, userPassword }) => {
      newUser.user.email = userEmail;
      newUser.user.password = userPassword;
      newUser.signedInMessage = `You are signed in as ${userEmail}`;
      runLoginFlow(newUser);
    });
  });

  it('SAAS-T85 - should see failed signup message', () => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
    runSignupAction(EXISTING_USER.user);
    popUp().isVisible().hasText(INVALID_USER.invalidSignUpMessage).siblings('button').click();
    signupForm().isVisible();
  });
});
