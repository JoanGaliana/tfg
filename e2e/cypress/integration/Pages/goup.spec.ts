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
        const id = Cypress.env('userGroups').find(({name})=>name=="Viaje Madrid").id;

        cy.visit(`/groups/${id}`);
      });
  });

  it('Loads group with spendings', () => {
    const group = Cypress.env('userGroups')[0];

    cy.get('[data-cy=nav-title]').contains(group.name);

    cy.get('[data-cy=spending-card]').contains("Hotel")
    cy.get('[data-cy=spending-card]').contains("Taxi")
  });

  it('Goes back to dashboard', () => {
    cy.get('[data-cy=nav-back]').click();
    cy.url().should('contain', 'dashboard')
  });
});

