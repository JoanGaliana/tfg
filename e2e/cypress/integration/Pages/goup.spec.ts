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
        const id = Cypress.env('userGroups').find(({ name }) => name == "Viaje Madrid").id;

        cy.visit(`/groups/${id}`);
      });
  });

  it('Loads group with spendings', () => {
    const group = Cypress.env('userGroups')[0];

    cy.get('[data-cy=nav-title]').contains(group.name);

    cy.get('[data-cy=spending-card][data-cy-name=Hotel]')
      .should("contain", "Hotel")
      .and("contain", "40.5 €")
      .and("contain", "bernardo")
      .and("not.contain", "Taxi")
      .and("not.contain", "30.5 €")

    cy.get('[data-cy=spending-card][data-cy-name=Taxi]')
      .should("contain", "Taxi")
      .and("contain", "30.5 €")
      .and("contain", "alicia")
      .and("not.contain", "Hotel")
      .and("not.contain", "40.5 €")
  });

  it('Goes back to dashboard', () => {
    cy.get('[data-cy=nav-back]').click();
    cy.url().should('contain', 'dashboard')
  });

  it('Has new spending button', () => {
    cy.get('[data-cy=create-spending]').click();
    cy.url().should('contain', '/groups/1/create-spending');
  });
});


