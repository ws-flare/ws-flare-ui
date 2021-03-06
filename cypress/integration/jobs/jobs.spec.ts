import { jobListItems, jobsListLength, navigateToJobs } from '../../support/jobs/jobs.po';

describe('Jobs', () => {

  beforeEach(() => {
    cy.fixture('fetch-jobs').as('cfJobsQuery');

    cy.server();

    localStorage.setItem('user', JSON.stringify({isLoggingIn: false, isLoggedIn: true}));

    cy.route('POST', 'graphql', '@cfJobsQuery');

    navigateToJobs();
  });

  it('should display a list of jobs', () => {
    jobsListLength().should('eq', 3);
  });


  it('should be able to click on a job', () => {
    jobListItems().eq(1).click();

    cy.url().should('contain', '/projects/project1/task1/id2');
  });

});
