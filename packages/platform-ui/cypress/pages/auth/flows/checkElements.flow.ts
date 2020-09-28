import {
  emailField,
  emailFieldLabel,
  loginForm,
  passwordField,
  passwordFieldLabel, signupForm, signUpLink,
  submitButton, termsText
} from "../view/selectors";
import {Pages} from "../../common/constants";
import {PRIVACY_POLICY_URL, TERMS_MESSAGE, TERMS_OF_SERVICE_URL} from "../constants/constants";

export const runVerifyPageElementsFlow = (page: Pages) => {
  const isLoginPage = page === Pages.Login;
  const form = isLoginPage ? loginForm : signupForm;

  form().isVisible();
  emailFieldLabel().contains('Email *');
  emailField().isVisible();
  passwordFieldLabel().contains('Password *');
  passwordField().isVisible();
  submitButton().isVisible().isDisabled();

  if (isLoginPage) signUpLink().hasAttr('href', '/signup');

  if (!isLoginPage) {
    termsText().isVisible()
      .hasText(TERMS_MESSAGE)
      .find('a').hasAttr('href', TERMS_OF_SERVICE_URL)
      .next().hasAttr('href', PRIVACY_POLICY_URL);
    submitButton().isVisible().isDisabled();
    signUpLink().hasAttr('href', '/login');
  }
};
