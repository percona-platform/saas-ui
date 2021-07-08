import { EXISTING_USER, pageDetailsMap, Pages } from 'pages/common/constants';
import { getUser } from 'pages/auth/getUser';
import { setAliases } from 'pages/auth/requests';
import { dropdownMenu, profileButton, profileIcon } from 'pages/main/selectors';
import { OKTA_PROFILE_SETTINGS, MESSAGES } from 'pages/profile/constants';
import { changeEmailLink, updateProfileButton } from 'pages/profile/selectors';
import {
  emailField,
  firstNameField,
  firstNameValidation,
  lastNameField,
  lastNameValidation,
} from 'pages/auth/selectors';

const newUser = getUser();
const firstName = 'John';
const lastName = 'Doe';
const longInput = 'this is 51 character string for negative inputs test!!!!!!!';

context('User Profile', () => {
  before(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);

    // Sign Up new user
    cy.runSignUpAction(newUser.user);
    cy.checkPopUpMessage(newUser.activationEmailSentMessage);

    // Activate a user directly through OKTA
    cy.oktaGetUser(newUser.user.email).then((data) => {
      cy.oktaSetUserPassword(data.id, newUser.user.password);
    });
  });

  after(() => {
    setAliases();

    // Delete user after tests
    cy.oktaGetUser(newUser.user.email).then((data) => {
      cy.oktaDeleteUser(data.id);
    });
  });

  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
    cy.runLoginAction(newUser.user);
  });

  it('SAAS-T128 should be able to open profile page', () => {
    // Open dropdown menu
    profileIcon().click();
    dropdownMenu().isVisible();

    // Select Profile option from dropdown
    profileButton().hasText('Profile').click();
    cy.url().should('be.eq', `${Cypress.config().baseUrl}${pageDetailsMap[Pages.Profile].url}`);

    // Verify Profile Settings form elements
    cy.get('form > legend').hasText('Profile Settings');
    emailField().isDisabled();
    cy.get('qa:email-field-label').hasText('Email');
    emailField().hasAttr('value', newUser.user.email);
    verifyFields();
    cy.get('qa:firstName-field-label').hasText('First name');
    cy.get('qa:lastName-field-label').hasText('Last name');
    updateProfileButton().isDisabled();
  });

  it('should be able to see change profile link', () => {
    cy.visit(pageDetailsMap[Pages.Profile].url);
    changeEmailLink()
      .hasAttr('href', OKTA_PROFILE_SETTINGS)
      .hasAttr('target', '_blank')
      .hasText('Change email address');
  });

  it('SAAS-T130 should have validation for user profile fields', () => {
    cy.visit(pageDetailsMap[Pages.Profile].url);
    verifyFields();

    // Clear first name and last name fields
    firstNameField().clear();
    lastNameField().clear();
    firstNameField().focus();

    // Verify first name and last name fields can't be empty
    firstNameValidation().hasText('Required field');
    updateProfileButton().isDisabled();
    lastNameValidation().hasText('Required field');
    updateProfileButton().isDisabled();

    // Verify validation error for string length
    firstNameField().clear().type(longInput);
    firstNameValidation().hasText(MESSAGES.TO_LONG_STRING);
    lastNameField().clear().type(longInput);
    lastNameValidation().hasText(MESSAGES.TO_LONG_STRING);
    updateProfileButton().isDisabled();

    // Verify there is no validation error for a string with 50 characters
    // eslint-disable-next-line no-magic-numbers
    firstNameField().clear().type(longInput.slice(0, 50));
    firstNameValidation().hasText('');
    // eslint-disable-next-line no-magic-numbers
    lastNameField().clear().type(longInput.slice(0, 50));
    lastNameValidation().hasText('');
    updateProfileButton().isEnabled();

    // Fill in valid first and last names
    firstNameField().clear().type(firstName);
    firstNameValidation().hasText('');
    lastNameField().clear().type(lastName);
    lastNameValidation().hasText('');

    // Verify Save button is active and there are no validation errors
    updateProfileButton().isEnabled();
  });

  it('SAAS-T129 should be able to update user profile', () => {
    cy.visit(pageDetailsMap[Pages.Profile].url);
    verifyFields();

    // Fill in valid first name and last name
    firstNameField().clear().type(firstName);
    lastNameField().clear().type(lastName);

    // Save changes
    updateProfileButton().isEnabled().click();
    cy.checkPopUpMessage(MESSAGES.PROFILE_UPDATED);

    // Reload page and verify that first name and last name are updated
    cy.reload();
    firstNameField().hasAttr('value', firstName);
    lastNameField().hasAttr('value', lastName);

    // Logout and login again
    cy.runLogoutAction();
    cy.checkPopUpMessage(EXISTING_USER.loggedOutMessage);
    cy.runLoginAction(newUser.user);
    cy.visit(pageDetailsMap[Pages.Profile].url);

    // Verify that first name and last name are updated
    firstNameField().hasAttr('value', firstName);
    lastNameField().hasAttr('value', lastName);
  });
});

const verifyFields = () => {
  firstNameField().hasAttr('value', newUser.user.firstName);
  lastNameField().hasAttr('value', newUser.user.lastName);
};
