declare namespace Cypress {
  interface Chainable {

    /**
     * Get User object by email.
     *
     * @example
     *   const email = 'email@example.com';
     *   cy.oktaGetUser(email).then((data) => {
     *     cy.log(data);
     *   });
     * @param userEmail
     */
    oktaGetUser(userEmail): Chainable;

    /**
     * Set user password. (Activate)
     *
     * @example
     *   cy.oktaSetUserPassword(userId, password)
     * @param userId
     * @param password
     */
    oktaSetUserPassword(userId, password): Chainable;

    /**
     * Delete user by userID.
     *
     * @example
     *   cy.oktaGetUser('email@example.com').then((data) => {
     *       cy.oktaDeleteUser(data.id);
     *     });
     * @param userId
     */
    oktaDeleteUser(userId): Chainable;
  }
}
