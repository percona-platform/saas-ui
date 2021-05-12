/// <reference types="cypress" />
import { ValidUser } from 'pages/common/interfaces/Auth';

declare namespace Cypress {
  interface Chainable {

    /**
     * Login user and make sure user is logged in.
     *
     * @example
     *   const user = EXISTING_USER;
     *   cy.runLoginFlow(user);
     * @param user
     */
    runLoginFlow(user: ValidUser): Chainable;

    /**
     * Login user and make sure user is logged in.
     *
     * @example
     *   const user = getUser();
     *   cy.runSignUpFlow(user);
     * @param user
     */
    runSignUpFlow(user: ValidUser): Chainable;
  }
}
