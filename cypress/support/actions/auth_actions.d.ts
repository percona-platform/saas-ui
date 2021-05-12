/// <reference types="cypress" />

import { User } from 'pages/common/interfaces/Auth';

declare namespace Cypress {
  interface Chainable {
    runLoginAction(user: User, shouldFail: boolean): Chainable;
    runSignUpAction(user: User): Chainable;
  }
}
