/// <reference types="cypress" />
// to specify data-qa attribute selector add prefix 'qa:' to the locator

export const updateProfileButton = () => cy.get('qa:profile-submit-button');
export const profileForm = () => cy.get('qa:profile-form');
export const changeEmailLink = () => cy.get('qa:profile-edit-button');
