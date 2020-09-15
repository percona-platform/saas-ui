// to specify data-qa attribute selector add prefix 'qa:' to the locator

export const authLocators = {
  loginForm: 'qa:login-form',
  signupForm: 'qa:signup-form',
  emailFieldLabel: 'qa:email-field-label',
  emailField: 'qa:email-text-input',
  emailValidation: 'qa:email-field-error-message',
  passwordFieldLabel: 'qa:password-field-label',
  passwordField: 'qa:password-password-input',
  passwordValidation: 'qa:password-field-error-message',
  submitButton: 'qa:login-submit-button',
  signUpLink: 'qa:signup-action-button',
  logoutButton: 'qa:logout-action-button',
  termsCheckbox: 'qa:consent-checkbox-input',
  termsText: 'qa:consent-field-label',
  termsValidation: 'qa:consent-field-error-message'
};
