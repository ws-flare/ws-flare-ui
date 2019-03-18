export const navigateToProjects = () => cy.visit('/projects');

export const projectsList = () => cy.get('mat-list');

export const projectListItems = () => projectsList().find('mat-list-item');

export const projectsListLength = () => projectsList().find('mat-list-item').its('length');
