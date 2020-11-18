/// <reference types="cypress" />

import { pageDetailsMap, Pages, VALID_USER } from 'pages/common/constants';
import { loginForm } from 'pages/auth/view/selectors';
import { popUp } from 'pages/common/view/selectors';
import { setAliases } from 'pages/auth/requests/requests';
import { runLoginAction } from 'pages/auth/actions/login.action';
import { dropdownMenu, logoutButton, profileIcon } from 'pages/main/view/selectors';

context('Logout', () => {
  beforeEach(() => {
    setAliases();
    cy.visit(pageDetailsMap[Pages.Login].url);
    runLoginAction(VALID_USER.user);
  });

  it('should be able to logout', () => {
    profileIcon().isVisible().click();
    dropdownMenu().isVisible();
    logoutButton().click();
    loginForm().isVisible();
    popUp().hasText(VALID_USER.loggedOutMessage);
  });
});
