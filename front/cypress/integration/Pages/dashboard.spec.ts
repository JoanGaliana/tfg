/// <reference types="cypress" />

describe('Unauthenticated dashboard', () => {
  it('Secured page', () => {
    cy.visit('/dashboard');
    cy.url().should('contain', 'login')
  })
})

describe('Logged in dashboard', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/dashboard');
  });
  
  it('Navbar', () => {
    cy.get('[data-cy=nav-title]').contains('Mis grupos');
    cy.get('[data-cy=nav-back]').should('not.exist');
  });
  
  it('Has groups list', () => {
    cy.contains('Casa');
    cy.contains('bernardo@test.com');
    cy.contains('alicia@test.com');
    cy.contains('Trabajo');
    cy.contains('Padel');
  });
  
  it('Has new group button', () => {
    cy.get('[data-cy=create-group]').click();	
    cy.url().should('contain', 'groups/new');
  });
});
