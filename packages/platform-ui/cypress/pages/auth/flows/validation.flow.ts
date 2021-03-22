import {
  emailField,
  emailFieldLabel,
  emailValidation,
  passwordField,
  passwordValidation,
  submitButton,
  termsCheckbox,
  termsValidation,
} from 'pages/auth/view/selectors';
import { appendField, checkValidation, fillField } from 'pages/common/view/behavior/common';
import { VALIDATION_MESSAGES } from 'pages/auth/constants/constants';
import { Pages, EXISTING_USER } from 'pages/common/constants';

export const runFieldsValidationFlow = (page: Pages) => {
  emailFieldLabel().click();
  cy.get('a').last().focus();
  checkValidation({ element: emailValidation, text: VALIDATION_MESSAGES.REQUIRED_FIELD });
  fillField({ field: emailField, value: 'some email' });
  checkValidation({ element: emailValidation, text: VALIDATION_MESSAGES.INVALID_EMAIL });

  if (page === Pages.Login) {
    passwordField().click();
    cy.get('a').focus();
    checkValidation({ element: passwordValidation, text: VALIDATION_MESSAGES.REQUIRED_FIELD });
    fillField({ field: passwordField, value: 'test' });
    checkValidation({ element: passwordValidation, text: VALIDATION_MESSAGES.SHORT_PASSWORD });
    appendField({ field: passwordField, value: 'testqwerty' });
    checkValidation({ element: passwordValidation, text: VALIDATION_MESSAGES.NUMBER_IN_PASSWORD });
    appendField({ field: passwordField, value: '1' });
    checkValidation({ element: passwordValidation, text: VALIDATION_MESSAGES.UPPER_CASE_IN_PASSWORD });
    appendField({ field: passwordField, value: 'P' });
    checkValidation({ element: passwordValidation, text: '' });
  }

  submitButton().isVisible().isDisabled();

  if (page === Pages.SignUp) {
    fillField({ field: emailField, value: EXISTING_USER.user.email });
    termsCheckbox().click({ force: true });
    submitButton().isEnabled();
    termsCheckbox().click({ force: true });
    emailField().click();
    termsValidation().hasText(VALIDATION_MESSAGES.REQUIRED_FIELD);
  }
};
