/// <reference types="cypress" />

describe('Group page', () => {
  before(() => {
    cy.login()
    .getCurrentUser()
    .getUserGroup()
  })

  beforeEach(() => {
    cy.login()
      .then(() => {
        const id = Cypress.env('userGroups')[0].id;

        cy.visit(`/groups/${id}`);
      });
  });

  it('Loads group', () => {
    const group = Cypress.env('userGroups')[0];

    cy.get('[data-cy=nav-title]').contains(group.name);
  });

  it('Goes back to dashboard', () => {
    cy.get('[data-cy=nav-back]').click();
    cy.url().should('contain', 'dashboard')
  });
});

