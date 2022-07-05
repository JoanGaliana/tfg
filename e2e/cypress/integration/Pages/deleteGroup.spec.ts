/// <reference types="cypress" />

describe('Delete groups', () => {
  beforeEach(() => {
    cy.login()
      .getCurrentUser()
      .createGroup().then(() => {
        const id = Cypress.env('createdGroupId');

        cy.wrap(id).as('groupId');
        cy.visit(`/groups/${id}/configuration`)
      })
  })

  it('Adds member to group', function () {
    cy.get('[data-cy=remove-group]')
    .click();

    cy.url().should('contain', 'dashboard')

    cy.getUserGroup().then(()=>{
      cy.wrap( Cypress.env('userGroups').map(group=>group.id)).
        should('not.contain', this.groupId)
    })

  });

});