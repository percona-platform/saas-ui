/// <reference types="cypress" />

import { EXISTING_USER, pageDetailsMap, Pages } from 'pages/common/constants';
import { loginForm } from 'pages/auth/view/selectors';
import { popUp } from 'pages/common/view/selectors';
import { setAliases } from 'pages/auth/requests/requests';
import { runLoginAction } from 'pages/auth/actions/login.action';
import { dropdownMenu, logoutButton, profileIcon } from 'pages/main/view/selectors';

context('Logout', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
    runLoginAction(EXISTING_USER.user);
  });

  // TODO: unskip in scope of https://jira.percona.com/browse/SAAS-528
  it.skip('SAAS-T80 - should be able to logout', () => {
    profileIcon().isVisible().click();
    dropdownMenu().isVisible();
    logoutButton().click();
    loginForm().isVisible();
    popUp().hasText(EXISTING_USER.loggedOutMessage);
  });
});
