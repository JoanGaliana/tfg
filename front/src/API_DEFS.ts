/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/login": {
    post: operations["loginByPassword"];
  };
}

export interface components {
  schemas: {
    ApiError: {
      error?: string;
      timestamp?: string;
      details?: string;
    };
    LoginData: {
      email?: string;
      password?: string;
    };
  };
}

export interface operations {
  loginByPassword: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": string;
        };
      };
      /** Unauthorized */
      401: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginData"];
      };
    };
  };
}

export interface external {}
