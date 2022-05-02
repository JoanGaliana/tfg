/// <reference types="cypress" />

describe('login examples', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.wrap(Cypress.env('email')).as('email');
    cy.wrap('pepe').as('wrongEmail');

    cy.wrap(Cypress.env('password')).as('password');
    cy.wrap('123').as('wrongPassword');

  });

  it('Email field has default focus', () => {
    cy.get('#email').should('have.focus');
  });

  it('Redirects to dashboard on successful login', function () {
    cy.get('#email').type(this.email);
    cy.get('#password').focus().type(this.password);
    cy.get('[type="submit"]').click();

    cy.url().should('contain', 'dashboard')
  });

  it('Error is shown with wrong email and password', function () {
    cy.get('#email').type(this.wrongEmail);
    cy.get('#password').focus().type(this.wrongPassword);
    cy.get('[type="submit"]').click();

    cy.get('#email').parent().should('have.class', 'Mui-error');
    cy.get('#email').parent().should('have.class', 'Mui-error');

    cy.get('#email').clear().type(this.wrongEmail);
    cy.get('#password').focus().clear().type(this.password);
    cy.get('[type="submit"]').click();

    cy.get('#email').parent().should('have.class', 'Mui-error');
    cy.get('#email').parent().should('have.class', 'Mui-error');

    cy.get('#email').clear().type(this.email);
    cy.get('#password').focus().clear().type(this.wrongPassword);
    cy.get('[type="submit"]').click();

    cy.get('#email').parent().should('have.class', 'Mui-error');
    cy.get('#email').parent().should('have.class', 'Mui-error');
  });
});
