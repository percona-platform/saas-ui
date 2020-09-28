/// <reference types="cypress" />
// In order to chain commands that are defined in the support/commands.js they should be added here as well

declare namespace Cypress {
    // eslint-disable-next-line

    interface Chainable<Subject> {
        isVisible(): Chainable<Subject>
        isDisabled(): Chainable<Subject>
        isEnabled(): Chainable<Subject>

        hasText(s: string): Cypress.Chainable<Subject>
        hasAttr(key: string, value: string): Cypress.Chainable<Subject>
    }
}
