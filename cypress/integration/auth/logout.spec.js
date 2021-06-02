import { EXISTING_USER, pageDetailsMap, Pages } from 'pages/common/constants';
import { loginForm } from 'pages/auth/selectors';
import { setAliases } from 'pages/auth/requests';
import { dropdownMenu, logoutButton, profileIcon } from 'pages/main/selectors';

context('Logout', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
    cy.runLoginAction(EXISTING_USER.user);
  });

  it('SAAS-T80 - should be able to logout', () => {
    profileIcon().click();
    dropdownMenu().isVisible();
    logoutButton().click();
    loginForm().isVisible();
    cy.checkPopUpMessage(EXISTING_USER.loggedOutMessage);
  });
});
