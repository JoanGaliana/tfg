/// <reference types="cypress" />

describe('login examples', () => {
  beforeEach(() => {
    cy.visit('/register');

    cy.wrap(Cypress.env('email')).as('existingEmail');

  });

  it('Redirects to dashboard on successful creation', function () {
    const email = `test_autocreated_${Date.now()}@test.com`
    cy.get('#email').should('have.focus');

    cy.get('#email').type(email);
    cy.get('#password').focus().type("124#|@~qw124");
    cy.get('[type="submit"]').click();

    cy.url().should('contain', 'dashboard');
    cy.contains(email);
  });

  it('Errors', function () {
    cy.get('#email').type(this.existingEmail);
    cy.get('#password').focus().type("124#|@~qw124");
    cy.get('[type="submit"]').click();

    cy.get('#email').parent().should('have.class', 'Mui-error');
    cy.get('#password').parent().should('not.have.class', 'Mui-error');

    cy.get('#email').clear().type("non-existant@test.com");
    cy.get('#password').focus().clear();
    cy.get('[type="submit"]').click();

    cy.get('#email').parent().should('not.have.class', 'Mui-error');
    cy.get('#password').parent().should('have.class', 'Mui-error');
  });
});
