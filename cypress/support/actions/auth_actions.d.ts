/// <reference types="cypress" />

import { User } from 'pages/common/interfaces/Auth';

declare namespace Cypress {
  interface Chainable {
    /**
     * Login as user. (without UI interaction)
     * If shouldFail is true it doesn't refresh page. (useful when we want to verify a pop up message)
     *
     * @example
     *   const user = EXISTING_USER;
     *   cy.runLoginAction(user);
     * @param user
     * @param shouldFail
     */
    runLoginAction(user: User, shouldFail: boolean): Chainable;

    /**
     * Sign up a user. (without UI interaction)
     *
     * @example
     *   const user = getUser();
     *   cy.runSignUpAction(user);
     * @param user
     */
    runSignUpAction(user: User): Chainable;
  }
}
