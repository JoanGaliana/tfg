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
});


