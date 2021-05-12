/// <reference types="cypress" />
// In order to chain commands that are defined in the support/common.js they should be added here as well

declare namespace Cypress {
  interface Chainable {
    /**
     * Asserts that element is visible
     *
     * @example
     *   cy.get('button').isVisible();
     */
    isVisible(): Chainable;
    /**
     * Asserts that element is disabled
     *
     * @example
     *   cy.get('button').isDisabled();
     */
    isDisabled(): Chainable;
    /**
     * Asserts that element is enabled
     *
     * @example
     *   cy.get('button').isEnabled();
     */
    isEnabled(): Chainable;
    /**
     * Asserts that element has text
     *
     * @example
     *   cy.get('button').hasText('ClickMe');
     * @param text
     */
    hasText(text: string): Chainable;
    /**
     * Asserts that element has attribute
     *
     * @example
     *   cy.get('a').hasAttr('href', 'https://google.com');
     * @param key
     * @param value
     */
    hasAttr(key: string, value: string): Chainable;
    /**
     * Asserts that popUp has text and closes popUp after verification
     *
     * @example
     *   cy.checkPopUpMessage('Settings Updated');
     * @param message
     */
    checkPopUpMessage(message: string): Chainable;
  }
}
