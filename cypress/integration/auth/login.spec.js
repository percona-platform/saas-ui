import {
  loginForm,
  signupForm,
  signUpLink,
  forgotPassword,
  emailFieldLabel,
  emailField,
  passwordField,
  passwordValidation,
  submitButton,
  passwordFieldLabel,
} from 'pages/auth/selectors';
import { setAliases } from 'pages/auth/requests';
import { INVALID_USER, EXISTING_USER, pageDetailsMap, Pages } from 'pages/common/constants';
import { VALIDATION_MESSAGES, FORGOT_PASSWORD_URL } from 'pages/auth/constants';
import { checkEmailValidation } from './helper';

context('Login', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
  });

  it('SAAS-T82 - should be able to see the login form', () => {
    loginForm().isVisible();
    emailFieldLabel().contains('Email *');
    emailField().isVisible();
    submitButton().isDisabled();
    passwordFieldLabel().contains('Password *');
    passwordField().isVisible();
    signUpLink().hasAttr('href', '/signup');
  });

  it('should be able to see "Forgot Password" link', () => {
    forgotPassword().hasAttr('href', FORGOT_PASSWORD_URL);
  });

  it('SAAS-T114 - should have validation for login input fields', () => {
    checkEmailValidation();
    passwordField().click();
    cy.get('a').last().focus();
    passwordValidation().hasText(VALIDATION_MESSAGES.REQUIRED_FIELD);
    passwordField().clear().type('test');
    passwordValidation().hasText(VALIDATION_MESSAGES.SHORT_PASSWORD);
    passwordField().type('testqwerty');
    passwordValidation().hasText(VALIDATION_MESSAGES.NUMBER_IN_PASSWORD);
    passwordField().type('1');
    passwordValidation().hasText(VALIDATION_MESSAGES.UPPER_CASE_IN_PASSWORD);
    passwordField().type('P');
    passwordValidation().hasText('');
    submitButton().isVisible().isDisabled();
  });

  it('SAAS-T83 - should be able to open the signup page from the login', () => {
    signUpLink().click();
    cy.url().should('contain', pageDetailsMap[Pages.SignUp].url);
    signupForm().isVisible();
  });

  it('SAAS-T111 SAAS-T81 - should be able to login', () => {
    cy.runLoginFlow(EXISTING_USER);
  });

  it('SAAS-T86 - should see invalid username or password message', () => {
    cy.runLoginAction(INVALID_USER.user, true);
    cy.checkPopUpMessage(INVALID_USER.invalidLoginMessage);
    loginForm().isVisible();
  });
});
