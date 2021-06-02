import { emailField, emailFieldLabel, emailValidation } from 'pages/auth/selectors';
import { VALIDATION_MESSAGES } from 'pages/auth/constants';

export const checkEmailValidation = () => {
  emailFieldLabel().click();
  cy.get('a').last().focus();
  emailValidation().hasText(VALIDATION_MESSAGES.REQUIRED_FIELD);
  emailField().clear().type('some email');
  emailValidation().hasText(VALIDATION_MESSAGES.INVALID_EMAIL);
};
