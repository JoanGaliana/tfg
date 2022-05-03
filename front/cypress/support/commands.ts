// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

import { setStoredAuthToken } from '../../src/services/AuthService';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      login(): void
    }
  }
}
Cypress.Commands.add("login", () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');
  const backendURL = Cypress.env('backendURL');

  cy.request("POST", `${backendURL}/login`, {
    email,
    password
  }).then(response => {

    if (response.status !== 201) {
      throw new Error(`Failed login ${response.status}`)
    }
    const token = response.body;

    setStoredAuthToken(token);
  });
});
