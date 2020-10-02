import { User } from 'pages/common/interfaces/Auth';
import { checkValidation, fillField } from 'pages/common/view/behavior/common';
import { emailField, emailValidation, passwordField, passwordValidation } from 'pages/auth/view/selectors';

export const fillEmailPassword = ({ email, password }: User) => {
  fillField({ field: emailField, value: email });
  checkValidation({ element: emailValidation, text: '' });
  fillField({ field: passwordField, value: password });
  checkValidation({ element: passwordValidation, text: '' });
};
