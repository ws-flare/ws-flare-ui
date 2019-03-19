import { navigateToTasks, taskssListLength } from '../../support/tasks/tasks.po';

describe('Tasks', () => {

  beforeEach(() => {
    cy.fixture('fetch-tasks').as('cfTasksQuery');

    cy.server();

    localStorage.setItem('user', JSON.stringify({isLoggingIn: false, isLoggedIn: true}));

    cy.route('POST', 'graphql', '@cfTasksQuery');

    navigateToTasks();
  });

  it('should display a list of tasks', () => {
    taskssListLength().should('eq', 3);
  });

});
