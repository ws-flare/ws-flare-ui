import { navigateTo, usernameInput, passwordInput, signupButton, loginButton, emailInput } from '../support/signup.po';

describe('Signup', () => {

  beforeEach(() => {
    cy.fixture('signup').as('signupQuery');
  });

  beforeEach(navigateTo);

  it('should display username, email, password and submit button', () => {
    usernameInput().should('be.visible');
    emailInput().should('be.visible');
    passwordInput().should('be.visible');
    signupButton().should('be.visible');
  });

  it('should be able to signup', () => {
    cy.server();
    cy.route('POST', 'graphql', '@signupQuery');

    usernameInput().type('testUsername');
    emailInput().type('test@test.com');
    passwordInput().type('testPassword');
    signupButton().click();
  });

  it('should switch to login form', () => {
    loginButton().click();

    cy.url().should('contain', '/home/login');
  });
});
