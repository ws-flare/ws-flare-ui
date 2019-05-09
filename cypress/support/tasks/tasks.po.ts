export const navigateToTasks = () => cy.visit('/projects/abc123');

export const tasksList = () => cy.get('mat-list');

export const taskListItems = () => tasksList().find('mat-list-item');

export const tasksListLength = () => tasksList().find('mat-list-item').its('length');

export const clickOptions = (index: number) => cy.get('.mat-icon-button').eq(index).click();

export const generateCiToken = (index: number) => {
  clickOptions(index);

  cy.get('.mat-menu-item').eq(0).click();
};

export const getToken = () => cy.get('.token');
