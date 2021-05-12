import { EXISTING_USER, INVALID_USER, pageDetailsMap, Pages } from 'pages/common/constants';
import { getUser } from 'pages/auth/getUser';
import { setAliases } from 'pages/auth/requests';
import {
  emailField,
  emailFieldLabel,
  firstNameField,
  firstNameValidation,
  lastNameField,
  lastNameValidation,
  loginForm,
  signupForm,
  signUpLink,
  submitButton,
  termsCheckbox,
  termsText,
  termsValidation,
} from 'pages/auth/selectors';
import {
  PRIVACY_POLICY_URL,
  TERMS_MESSAGE,
  TERMS_OF_SERVICE_URL,
  VALIDATION_MESSAGES,
} from 'pages/auth/constants';
import { checkEmailValidation } from './helper';

const newUser = getUser();

context('Sign Up', () => {
  beforeEach(() => {
    setAliases();
  });

  it('SAAS-T82 - should be able to see the signup form', () => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
    signupForm().isVisible();
    emailFieldLabel().contains('Email *');
    emailField().isVisible();
    submitButton().isDisabled();
    termsText().isVisible()
      .hasText(TERMS_MESSAGE)
      .find('a').hasAttr('href', TERMS_OF_SERVICE_URL)
      .next().hasAttr('href', PRIVACY_POLICY_URL);
    submitButton().isDisabled();
    signUpLink().hasAttr('href', '/login');
  });

  it('SAAS-T115 - should have validation for signup input fields', () => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
    checkEmailValidation();
    submitButton().isVisible().isDisabled();
    emailField().clear().type(EXISTING_USER.user.email);
    firstNameField().focus();
    lastNameField().focus();
    firstNameField().focus();
    firstNameValidation().hasText(VALIDATION_MESSAGES.REQUIRED_FIELD);
    lastNameValidation().hasText(VALIDATION_MESSAGES.REQUIRED_FIELD);
    firstNameField().clear().type(EXISTING_USER.user.firstName);
    lastNameField().clear().type(EXISTING_USER.user.lastName);
    termsCheckbox().click({ force: true });
    submitButton().isEnabled();
    termsCheckbox().click({ force: true });
    emailField().click();
    termsValidation().hasText(VALIDATION_MESSAGES.REQUIRED_FIELD);
    termsCheckbox().click({ force: true });
    submitButton().isEnabled();
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
    cy.runSignUpFlow(newUser);
  });

  it('should not be able to login with inactive account', () => {
    cy.visit(pageDetailsMap[Pages.Login].url);
    cy.task('getUser').then(({ userEmail, userPassword }) => {
      newUser.user.email = userEmail;
      newUser.user.password = userPassword;
      cy.runLoginAction(newUser.user, true);
      cy.checkPopUpMessage(INVALID_USER.invalidLoginMessage);
      loginForm().isVisible();
    });
  });

  it('should be able to activate account', { baseUrl: null }, () => {
    cy.task('getUser').then(({ userEmail, userPassword }) => {
      cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SAAS_SERVER_ID'), { sentTo: userEmail }, { timeout: 20000 })
        .then((message) => {
          const link = message.html.links
            .find(({ text }) => text.trim() === 'Activate').href;

          cy.visit(link);
          cy.get('[name="newPassword"]').type(userPassword);
          cy.get('[name="verifyPassword"]').type(userPassword);
          cy.get('#next-button').click();
          cy.get('[data-se="user-menu"]').isVisible();
          cy.url().should('include', '/app/UserHome');
        });
    });
  });

  it('should be able to login with new account', () => {
    cy.visit(pageDetailsMap[Pages.Login].url);
    cy.task('getUser').then(({ userEmail, userPassword }) => {
      newUser.user.email = userEmail;
      newUser.user.password = userPassword;
      newUser.signedInMessage = `You are signed in as ${userEmail}`;
      cy.runLoginFlow(newUser);
    });
  });

  it('SAAS-T85 - should see failed signup message', () => {
    cy.visit(pageDetailsMap[Pages.SignUp].url);
    cy.runSignUpAction(EXISTING_USER.user);
    cy.checkPopUpMessage(INVALID_USER.invalidSignUpMessage);
    signupForm().isVisible();
  });
});
