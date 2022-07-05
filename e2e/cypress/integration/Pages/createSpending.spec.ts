/// <reference types="cypress" />

describe('Create new spending', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/groups/1/create-spending');
    cy.wrap(`test spending ${Date.now()}`).as('spendingName');
  });

  it('Goes back to group page', function () {
    cy.get('[data-cy=nav-back]').click();
    cy.url().should('not.contain', '/groups/1/create-spending').and('contain', '/groups/1')
  })

  it('Creates spending', function () {
    cy.get('#name').should('have.focus');

    // Required fields error
    cy.get('[type="submit"]').click();
    cy.get('#name').parent().should('have.class', 'Mui-error');
    cy.get('#amount').parent().should('have.class', 'Mui-error');
    cy.get('#userEmail').parent().should('have.class', 'Mui-error');

    // Correct data
    cy.get('#name').type(this.spendingName);
    cy.get('#name').parent().should('not.have.class', 'Mui-error');

    cy.get('#amount').type("5.6");
    cy.get('#userEmail').type("bernardo{enter}");

    cy.get('[type="submit"]').click();

    // Redirected and listed
    cy.url().should('not.contain', '/groups/1/create-spending').and('contain', '/groups/1')
    cy.contains(this.spendingName)

    cy.get(`[data-cy=spending-card][data-cy-name="${this.spendingName}"]`)
      .should("contain", this.spendingName)
      .and("contain", "5.6 €")
      .and("contain", "bernardo@test.com")
  });
});
