/// <reference types="cypress" />
import { ValidUser } from 'pages/common/interfaces/Auth';

declare namespace Cypress {
  interface Chainable {

    /**
     * Login user and make sure user is logged in.
     *
     * @example
     *   const message = 'message';
     *   cy.postMessage(message);
     *   cy.uiWaitUntilMessagePostedIncludes(message);
     * @param user
     */
    runLoginFlow(user: ValidUser): Chainable;
    runSignUpFlow(user: ValidUser): Chainable;
  }
}
