export const navigateToNodes = () => cy.visit('/projects/project1/task1/job1');

export const nodesList = () => cy.get('mat-list');

export const nodesListItems = () => nodesList().find('mat-list-item');

export const nodesListLength = () => nodesList().find('mat-list-item').its('length');
