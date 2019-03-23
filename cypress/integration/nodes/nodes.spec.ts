import { jobListItems, jobsListLength, navigateToJobs } from '../../support/jobs/jobs.po';
import { navigateToNodes, nodesListLength } from '../../support/nodes/nodes.po';

describe('Nodes', () => {

  beforeEach(() => {
    cy.fixture('fetch-nodes-data').as('cfNodesDataQuery');

    cy.server();

    localStorage.setItem('user', JSON.stringify({isLoggingIn: false, isLoggedIn: true}));

    cy.route('POST', 'graphql', '@cfNodesDataQuery');

    navigateToNodes();
  });

  it('should display a list of nodes', () => {
    nodesListLength().should('eq', 3);
  });

});
