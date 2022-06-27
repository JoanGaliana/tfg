
/// <reference types="cypress" />
import { Group } from '../@types/env';

export function getAuthenticationHeaders(authToken: string) {
  return {
    'Authorization': `Bearer ${authToken}`
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable;
      getUserGroup(): Chainable;
      getCurrentUser(): Chainable;
      createGroup(): Chainable;
    }
  }
}

Cypress.Commands.add("login", () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');
  const backendURL = Cypress.env('backendURL');

  const options: Partial<Cypress.RequestOptions> = {
    method: "POST",
    url: `${backendURL}/login`,
    body: {
      email,
      password
    },
    
    retryOnStatusCodeFailure: true, 
  }

  return cy.request(options).then(response => {
    if (response.status !== 201) {
      throw new Error(`Failed login ${response.status}`)
    }

    const token = response.body;

    localStorage.setItem("authToken", token);
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

Cypress.Commands.add("createGroup", () => {
  const backendURL = Cypress.env('backendURL');
  const authToken = Cypress.env('authToken');
  const currentUser = Cypress.env('currentUser')

  if (!authToken) {
    throw new Error("Auth token not set");
  }

  if (!currentUser || !currentUser.id) {
    throw new Error("Current User not set");
  }

  const headers = getAuthenticationHeaders(authToken)

  const options = {
    method: "POST",
    url: `${backendURL}/groups`,
    headers,
    body:{
      name: `Test_${Date.now()}`
    }
  }
  return cy.request<number>(options)
    .then(response => {
      if (response.status !== 201) {
        throw new Error(`Failed create group request ${response.status}`)
      }

      Cypress.env("createdGroupId", response.body);
    });
});
