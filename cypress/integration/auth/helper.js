import { emailField, emailFieldLabel, emailValidation } from 'pages/auth/selectors';
import { VALIDATION_MESSAGES } from 'pages/auth/constants';
import { MESSAGES } from 'pages/common/constants';

export const checkEmailValidation = () => {
  emailFieldLabel().click();
  cy.get('a').last().focus();
  emailValidation().hasText(MESSAGES.REQUIRED_FIELD);
  emailField().clear().type('some email');
  emailValidation().hasText(VALIDATION_MESSAGES.INVALID_EMAIL);
};
