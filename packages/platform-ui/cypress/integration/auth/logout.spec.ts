/// <reference types="cypress" />

import { pageDetailsMap, Pages } from 'pages/common/constants';
import { loginForm } from 'pages/auth/view/selectors';
import { popUp } from 'pages/common/view/selectors';
import { setAliases } from 'pages/auth/requests/requests';
import { runLoginAction } from 'pages/auth/actions/login.action';
import { dropdownMenu, logoutButton, profileIcon } from 'pages/main/view/selectors';
import { getNewUser } from 'pages/auth/utils/getNewUser';
import { runSignupAction } from 'pages/auth/actions/signup.action';

const newUser = getNewUser();

context('Logout', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
    runSignupAction(newUser.user);
    runLoginAction(newUser.user);
  });

  // Unskip in scope of https://jira.percona.com/browse/SAAS-513 after new auth flow done
  it.skip('SAAS-T80 - should be able to logout', () => {
    profileIcon().isVisible().click();
    dropdownMenu().isVisible();
    logoutButton().click();
    loginForm().isVisible();
    popUp().hasText(newUser.loggedOutMessage);
  });
});
