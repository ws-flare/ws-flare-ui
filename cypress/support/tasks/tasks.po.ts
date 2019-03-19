export const navigateToTasks = () => cy.visit('/projects/abc123');

export const tasksList = () => cy.get('mat-list');

export const taskListItems = () => tasksList().find('mat-list-item');

export const taskssListLength = () => tasksList().find('mat-list-item').its('length');
