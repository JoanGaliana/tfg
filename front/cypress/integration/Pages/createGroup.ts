/// <reference types="cypress" />

describe('Create new group', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/groups/new');
    cy.wrap(`test_${Date.now()}`).as('groupName');
  });

  it('Creates group', function () {
    cy.get('#name').should('have.focus');

    // Required field error
    cy.get('[type="submit"]').click();
    cy.get('#name').parent().should('have.class', 'Mui-error');

    // Correct data
    cy.get('#name').type(this.groupName);
    cy.get('#name').parent().should('not.have.class', 'Mui-error');

    cy.get('[type="submit"]').click();
    
    // Redirected and listed
    cy.url().should('not.contain', 'groups/new')
    cy.contains(this.groupName)
  });
});
