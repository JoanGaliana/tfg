/// <reference types="cypress" />

describe('Group members page', () => {
  before(() => {
    cy.login()
      .getCurrentUser()
      .getUserGroup()
  })

  beforeEach(() => {
    cy.login()
      .then(() => {
        const id = Cypress.env('userGroups').find(({ name }) => name == "Trabajo").id;

        cy.wrap(id).as('groupId');
        cy.visit(`/groups/${id}/members`);
      });
  });

  it('Loads members', () => {
    cy.get('[data-cy=nav-title]').contains("Trabajo");

    cy.get('[data-cy=member-card][data-cy-name=alicia\\@test\\.com]')
      .should("contain", "alicia@test.com")
      .and("contain", "50.3 €")
      .and("not.contain", "bernardo")
      .and("not.contain", "0 €")

    cy.get('[data-cy=member-card][data-cy-name=bernardo\\@test\\.com]')
      .should("contain", "bernardo@test.com")
      .and("contain", "0 €")
      .and("not.contain", "alicia")
      .and("not.contain", "50.3 €")
  });

  it('Goes back to dashboard', () => {
    cy.get('[data-cy=nav-back]').click();
    cy.url().should('contain', 'dashboard')
  });


  it('Navigation to add member', function () {
    cy.get('[data-cy="add-member"]').click();
    cy.url().should('contain', `/groups/${this.groupId}/add-member`)

    cy.get('[data-cy=nav-back]').click();
    cy.url().should('contain', `/groups/${this.groupId}/members`)
  });
});


describe('Add member', () => {
  before(() => {
    cy.login()
      .getCurrentUser()
      .createGroup().then(() => {
        const id = Cypress.env('createdGroupId');

        cy.wrap(id).as('groupId');
        cy.visit(`/groups/${id}/add-member`)
      })
  })

  it('Adds member to group', function () {
    cy.get("#email").type("nonexistant@test.com");
    cy.get("[type=submit]").click();

    cy.get('#email').parent().should('have.class', 'Mui-error');
    cy.get('#email-helper-text').should('contain', 'Usuario no encontrado');

    cy.get("#email").clear().type("bernardo@test.com");
    cy.get("[type=submit]").click();

    cy.url().should('contain', `/groups/${this.groupId}/members`)

    cy.get('[data-cy=member-card]').should('contain', 'bernardo@test.com')
  });

});