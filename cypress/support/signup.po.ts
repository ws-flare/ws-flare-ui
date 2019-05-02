export const navigateTo = () => cy.visit('/home/signup');

export const usernameInput = () => cy.get('input#signup-username');

export const emailInput = () => cy.get('input#signup-email');

export const passwordInput = () => cy.get('input#signup-password');

export const signupButton = () => cy.get('button#signup');

export const loginButton = () => cy.get('button#login');
