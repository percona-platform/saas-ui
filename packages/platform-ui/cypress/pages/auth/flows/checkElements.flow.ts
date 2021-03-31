import {
  emailField,
  emailFieldLabel,
  loginForm,
  passwordField,
  passwordFieldLabel,
  signupForm,
  signUpLink,
  submitButton,
  termsText,
} from 'pages/auth/view/selectors';
import { Pages } from 'pages/common/constants';
import { PRIVACY_POLICY_URL, TERMS_MESSAGE, TERMS_OF_SERVICE_URL } from 'pages/auth/constants/constants';

export const runPageElementsFlow = (page: Pages) => {
  const isLoginPage = page === Pages.Login;
  const form = isLoginPage ? loginForm : signupForm;

  form().isVisible();
  emailFieldLabel().contains('Email *');
  emailField().isVisible();
  submitButton().isVisible().isDisabled();

  if (isLoginPage) {
    passwordFieldLabel().contains('Password *');
    passwordField().isVisible();
    signUpLink().hasAttr('href', '/signup');
  }

  if (!isLoginPage) {
    termsText().isVisible()
      .hasText(TERMS_MESSAGE)
      .find('a').hasAttr('href', TERMS_OF_SERVICE_URL)
      .next().hasAttr('href', PRIVACY_POLICY_URL);
    submitButton().isVisible().isDisabled();
    signUpLink().hasAttr('href', '/login');
  }
};
