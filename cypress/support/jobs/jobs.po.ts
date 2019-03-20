export const navigateToJobs = () => cy.visit('/projects/project1/task1');

export const jobsList = () => cy.get('mat-list');

export const jobListItems = () => jobsList().find('mat-list-item');

export const jobsListLength = () => jobsList().find('mat-list-item').its('length');
