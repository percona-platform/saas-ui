/// <reference types="cypress" />
import {signUpLink} from "../../pages/auth/view/selectors";
import {runVerifyFieldsValidationFlow} from "../../pages/auth/flows/validation.flow";
import {runLoginFlow} from "../../pages/auth/flows/auth.flow";
import {runVerifyPageElementsFlow} from "../../pages/auth/flows/checkElements.flow";
import {pageDetailsMap, Pages, VALID_USER} from "../../pages/common/constants";

context('Login', () => {

  beforeEach(() => {
    cy.visit(pageDetailsMap[Pages.Login].url);
  });

  it('should be able to see the login form', () => {
    runVerifyPageElementsFlow(Pages.Login);
  });

  it('should have validation for login input fields', () => {
    runVerifyFieldsValidationFlow(Pages.Login);
  });

  it('should be able to open the signup page from the login', () => {
    signUpLink().click();
    cy.url().should('contain', pageDetailsMap[Pages.SignUp].url);
  });

  it('should be able to login', () => {
    runLoginFlow(VALID_USER);
  });
});
