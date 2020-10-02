/// <reference types="cypress" />
// to specify data-qa attribute selector add prefix 'qa:' to the locator

export const logoutButton = () => cy.get('qa:logout-action-button');
export const downloadPMMLink = () => cy.get('span').contains('Download PMM').parent().parent();
