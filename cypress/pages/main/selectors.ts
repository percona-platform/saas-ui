/// <reference types="cypress" />
// to specify data-qa attribute selector add prefix 'qa:' to the locator

export const logoutButton = () => cy.get('qa:menu-bar-profile-dropdown-logout');
export const downloadPMMLink = () => cy.get('span').contains('Download PMM').parent().parent();
export const profileIcon = () => cy.get('qa:menu-bar-profile-dropdown-toggle');
export const dropdownMenu = () => cy.get('qa:dropdown-menu-menu');
export const userEmail = () => cy.get('qa:user-email');
export const homeIcon = () => cy.get('qa:menu-bar-home-link');

