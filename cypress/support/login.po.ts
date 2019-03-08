export const navigateTo = () => cy.visit('/');

export const usernameInput = () => cy.get('input#username');

export const passwordInput = () => cy.get('input#password');

export const loginButton = () => cy.get('button#login');
