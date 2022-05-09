import { Group } from './../../src/services/GroupsService';
/// <reference types="cypress" />

import { getAuthenticationHeaders, getStoredAuthToken, setStoredAuthToken } from '../../src/services/AuthService';

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable;
      getUserGroup(): Chainable
      getCurrentUser(): Chainable
    }
  }
}

Cypress.Commands.add("login", () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');
  const backendURL = Cypress.env('backendURL');

  return cy.request("POST", `${backendURL}/login`, {
    email,
    password
  }).then(response => {
    if (response.status !== 201) {
      throw new Error(`Failed login ${response.status}`)
    }

    const token = response.body;

    setStoredAuthToken(token);
    Cypress.env('authToken', token);
  });
});

Cypress.Commands.add("getCurrentUser", () => {
  const backendURL = Cypress.env('backendURL');
  const authToken = Cypress.env('authToken');

  if (!authToken) {
    throw new Error("Auth token not set");
  }

  const headers = getAuthenticationHeaders(authToken)

  const options = {
    method: "GET",
    url: `${backendURL}/users/current`,
    headers,
  }
  return cy.request(options)
    .then(
      (response) => {
        if (response.status !== 200) {
          throw new Error(`Failed get current user request ${response.status}`)
        }

        Cypress.env("currentUser", response.body);
      }
    )
});

Cypress.Commands.add("getUserGroup", () => {
  const backendURL = Cypress.env('backendURL');
  const authToken = Cypress.env('authToken');
  const currentUser = Cypress.env('currentUser')

  if (!authToken) {
    throw new Error("Auth token not set");
  }

  cy.log(JSON.stringify(currentUser));

  if (!currentUser || !currentUser.id) {
    throw new Error("Current User not set");
  }

  const headers = getAuthenticationHeaders(authToken)

  const options = {
    method: "GET",
    url: `${backendURL}/users/${currentUser.id}/groups`,
    headers,
  }
  return cy.request<Group>(options)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Failed get user group request ${response.status}`)
      }

      Cypress.env("userGroups", response.body);
    });
});
