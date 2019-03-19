import { navigateToProjects, projectsListLength, projectListItems } from '../../support/projects/projects.po';

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

  it('should be able to click an organization', () => {
    projectListItems().eq(1).click();

    cy.url().should('contain', '/projects/id2');
  });

});
