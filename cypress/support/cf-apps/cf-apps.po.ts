export const navigateToCfApps = () => cy.visit('/cf-spaces/space1');

export const cfAppsList = () => cy.get('mat-list');

export const cfAppsListItems = () => cfAppsList().find('mat-list-item');

export const cfAppsListLength = () => cfAppsList().find('mat-list-item').its('length');
