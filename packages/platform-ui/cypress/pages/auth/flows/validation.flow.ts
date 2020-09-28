import {
  emailField,
  emailFieldLabel,
  emailValidation,
  passwordField,
  passwordValidation,
  submitButton,
  termsCheckbox,
  termsValidation
} from "../view/selectors";
import {appendField, checkValidation, fillField} from "../../common/view/behavior/common";
import {VALIDATION_MESSAGES} from "../constants/constants";
import {Pages, VALID_USER} from "../../common/constants";

export const runVerifyFieldsValidationFlow = (page: Pages) => {
  emailFieldLabel().click();
  passwordField().click();
  checkValidation({element: emailValidation, text: VALIDATION_MESSAGES.REQUIRED_FIELD});
  fillField({field: emailField, value: 'some email'});
  checkValidation({element: passwordValidation, text: VALIDATION_MESSAGES.REQUIRED_FIELD});
  checkValidation({element: emailValidation, text: VALIDATION_MESSAGES.INVALID_EMAIL});
  fillField({field: passwordField, value: 'test'});
  checkValidation({element: passwordValidation, text: VALIDATION_MESSAGES.SHORT_PASSWORD});
  appendField({field: passwordField, value: 'testqwerty'});
  checkValidation({element: passwordValidation, text: VALIDATION_MESSAGES.NUMBER_IN_PASSWORD});
  appendField({field: passwordField, value: '1'});
  checkValidation({element: passwordValidation, text: VALIDATION_MESSAGES.UPPER_CASE_IN_PASSWORD});
  appendField({field: passwordField, value: 'P'});
  checkValidation({element: passwordValidation, text: ''});
  submitButton().isVisible().isDisabled();

  if (page === Pages.SignUp) {
    fillField({field: emailField, value: VALID_USER.user.email});
    termsCheckbox().click({force: true});
    submitButton().isEnabled();
    termsCheckbox().click({force: true});
    passwordField().click();
    termsValidation().hasText(VALIDATION_MESSAGES.REQUIRED_FIELD);
  }
};
