import { User } from '../../src/services/UsersService';
import { Group } from "../../src/services/GroupsService";

declare global {
  namespace Cypress {

    export interface Cypress {

      /**
       * Returns all environment variables set with CYPRESS_ prefix or in "env" object in "cypress.json"
       *
       * @see https://on.cypress.io/env
       */
      env(): Partial<EnvKeys>;
      /**
       * Returns specific environment variable or undefined
       * @see https://on.cypress.io/env
       * @example
       *    // cypress.json
       *    { "env": { "foo": "bar" } }
       *    Cypress.env("foo") // => bar
       */
      env<T extends keyof EnvKeys>(key: T): EnvKeys[T];
      /**
       * Set value for a variable.
       * Any value you change will be permanently changed for the remainder of your tests.
       * @see https://on.cypress.io/env
       * @example
       *    Cypress.env("host", "http://server.dev.local")
       */
      env<T extends keyof EnvKeys>(key: T, value: EnvKeys[T]): void;

      /**
       * Set values for multiple variables at once. Values are merged with existing values.
       * @see https://on.cypress.io/env
       * @example
       *    Cypress.env({ host: "http://server.dev.local", foo: "foo" })
       */
      env(object: Partial<EnvKeys>): void;

    }

  }
}

export interface EnvKeys {
  'userGroups': Group[];
  'authToken': string;
  'currentUser': User;
}