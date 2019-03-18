import { navigateTo, usernameInput, passwordInput, loginButton } from '../support/login.po';

describe('Login', () => {

  beforeEach(() => {
    cy.fixture('login').as('loginQuery');
  });

  beforeEach(navigateTo);

  it('should display username and password and submit button', () => {
    usernameInput().should('be.visible');
    passwordInput().should('be.visible');
    loginButton().should('be.visible');
  });

  it('should be able to login', () => {
    cy.server();
    cy.route('POST', 'graphql', '@loginQuery');

    usernameInput().type('testUsername');
    passwordInput().type('testPassword');
    loginButton().click();

    cy.url().should('contain', '/projects');
  });
});
