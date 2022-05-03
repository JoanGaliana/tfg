/// <reference types="cypress" />

describe('Unauthenticated', () => {
  it('Secured page', () => {
    cy.visit('/dashboard');
    cy.url().should('contain', 'login')
  })
})

describe('Logged in', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/dashboard');
  });

  it('Loads', () => {
    cy.contains('Dashboard');
  });

});
