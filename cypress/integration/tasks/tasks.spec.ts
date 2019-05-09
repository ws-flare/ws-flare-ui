import { navigateToTasks, tasksListLength, taskListItems, generateCiToken, getToken } from '../../support/tasks/tasks.po';

describe('Tasks', () => {

  beforeEach(() => {
    cy.fixture('fetch-tasks').as('cfTasksQuery');

    cy.server();

    localStorage.setItem('user', JSON.stringify({isLoggingIn: false, isLoggedIn: true}));

    cy.route('POST', 'graphql', '@cfTasksQuery');

    navigateToTasks();
  });

  it('should display a list of tasks', () => {
    tasksListLength().should('eq', 3);
  });

  it('should be able to click on a task', () => {
    taskListItems().eq(1).click();

    cy.url().should('contain', '/projects/abc123/id2');
  });

  it('should generate token', () => {
    cy.fixture('generate-ci-token').as('generateCiTokenQuery');

    cy.route('POST', 'graphql', '@generateCiTokenQuery');

    generateCiToken(1);

    getToken().should('contain', 'abc123');
  });

});
