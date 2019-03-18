import { navigateToProjects, projectsListLength } from '../../support/projects/projects.po';

describe('Projects', () => {

  beforeEach(() => {
    cy.fixture('fetch-projects').as('cfProjectsQuery');

    cy.server();

    localStorage.setItem('user', JSON.stringify({isLoggingIn: false, isLoggedIn: true}));

    cy.route('POST', 'graphql', '@cfProjectsQuery');

    navigateToProjects();
  });

  it('should display a list of projects', () => {
    projectsListLength().should('eq', 3);
  });

});
