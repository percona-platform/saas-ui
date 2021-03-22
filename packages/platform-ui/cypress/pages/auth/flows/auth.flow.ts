/// <reference types="cypress" />
import { pageDetailsMap, Pages } from 'pages/common/constants';
import { submitButton, termsCheckbox } from 'pages/auth/view/selectors';
import { ValidUser } from 'pages/common/interfaces/Auth';
import { fillEmailPassword, fillEmail } from 'pages/auth/view/behavior/auth';
import { downloadPMMLink, homeIcon, profileIcon } from 'pages/main/view/selectors';
import { checkPopUpMessage } from 'pages/common/view/behavior/common';
import { DOWNLOAD_PMM_LINK } from 'pages/main/constants/constants';


export const runSignUpFlow = (user: ValidUser) => {
  runAuthFlow(user, Pages.SignUp);
};

export const runLoginFlow = (user: ValidUser) => {
  runAuthFlow(user, Pages.Login);
};

const runAuthFlow = (user: ValidUser, page: Pages) => {
  const { email } = user.user;

  submitButton().isVisible().isDisabled();

  if (page === Pages.Login) {
    fillEmailPassword(user.user);
    submitButton().isVisible().isEnabled().click();
    checkPopUpMessage(user.signedInMessage);
    cy.contains(email);
    downloadPMMLink().hasAttr('href', DOWNLOAD_PMM_LINK);
    profileIcon().isVisible();
    homeIcon().isVisible();
  }

  if (page === Pages.SignUp) {
    fillEmail(email);
    termsCheckbox().click({ force: true });
    submitButton().isVisible().isEnabled().click();
    checkPopUpMessage(user.activationEmailSentMessage);
    cy.url().should('contain', pageDetailsMap[Pages.Login].url);
  }
};
