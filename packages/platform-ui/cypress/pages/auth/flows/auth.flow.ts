/// <reference types="cypress" />
import { pageDetailsMap, Pages } from 'pages/common/constants';
import { submitButton, termsCheckbox } from 'pages/auth/view/selectors';
import { ValidUser } from 'pages/common/interfaces/Auth';
import { fillEmailPassword } from 'pages/auth/view/behavior/auth';
import { downloadPMMLink, logoutButton } from 'pages/main/view/selectors';
import { checkPopUpMessage } from 'pages/common/view/behavior/common';
import { DOWNLOAD_PMM_LINK } from 'pages/main/constants/constants';


export const runSignUpFlow = (user: ValidUser) => {
  runAuthFlow(user, Pages.SignUp);
};

export const runLoginFlow = (user: ValidUser) => {
  runAuthFlow(user, Pages.Login);
};

export const runAuthFlow = (user: ValidUser, page: Pages) => {
  const email = user.user.email;

  submitButton().isVisible().isDisabled();
  fillEmailPassword(user.user);

  if (page === Pages.Login) {
    submitButton().isVisible().isEnabled().click();
    checkPopUpMessage(user.signedInMessage);
    cy.contains(email);
    downloadPMMLink().hasAttr('href', DOWNLOAD_PMM_LINK);
  }

  if (page === Pages.SignUp) {
    termsCheckbox().click({ force: true });
    submitButton().isVisible().isEnabled().click();
    checkPopUpMessage(user.signedUpMessage);
    cy.url().should('contain', pageDetailsMap[Pages.Login].url);
  }
};
