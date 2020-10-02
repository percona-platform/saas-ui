import '@testing-library/cypress/add-commands';

// Assert that previous element is visible
Cypress.Commands.add('isVisible', { prevSubject: 'element' },
  ($element) => {
    cy.wrap($element).should('be.visible');
  },
);

// Assert that previous element is disabled
Cypress.Commands.add('isDisabled', { prevSubject: 'element' },
  ($element) => {
    cy.wrap($element).should('be.disabled');
  },
);

// Assert that previous element is enabled
Cypress.Commands.add('isEnabled', { prevSubject: 'element' },
  ($element) => {
    cy.wrap($element).should('be.enabled');
  },
);

// Assert that previous element contains passed text
Cypress.Commands.add('hasText', { prevSubject: 'element' },
  ($element, text) => {
    cy.wrap($element).should('have.text', text);
  },
);

// Assert that previous element contains passed attribute and value
Cypress.Commands.add('hasAttr', { prevSubject: 'element' },
  ($element, key, value) => {
    cy.wrap($element).should('have.attr', key, value);
  },
);
