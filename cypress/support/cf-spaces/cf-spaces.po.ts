export const navigateToCfSpaces = () => cy.visit('/cf-spaces');

export const cfSpacesList = () => cy.get('mat-list');

export const cfSpacesListItems = () => cfSpacesList().find('mat-list-item');

export const cfSpacesListLength = () => cfSpacesList().find('mat-list-item').its('length');
