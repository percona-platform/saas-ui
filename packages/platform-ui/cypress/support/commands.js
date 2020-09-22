import '@testing-library/cypress/add-commands'

// Assert text in pop up
Cypress.Commands.add('popUpContains', text => {
  cy.findByRole('alert').should('be.visible').should('have.text', text);
});
