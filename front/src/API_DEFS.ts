/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/login": {
    post: operations["loginByPassword"];
  };
  "/groups": {
    /** Current authenticated user is added to group members by default */
    post: operations["createNewGroup"];
  };
  "/groups/{id}/members": {
    /** User can only get data from its own groups */
    get: operations["getGroupMembersById"];
    post: operations["addMemberToGroup"];
  };
  "/groups/{groupId}/spendings": {
    /** Creates a new spending by an user in a group */
    post: operations["createNewSpending"];
  };
  "/users/{id}/groups": {
    /** Users can only get their own groups */
    get: operations["getUserGroups"];
  };
  "/users/current": {
    get: operations["getCurrentUser"];
  };
  "/groups/{id}": {
    /** User can only get data from its own groups */
    get: operations["getGroupById"];
  };
  "/groups/{id}/spendings": {
    /** Gets all spendings of a group */
    get: operations["getGroupSpendings"];
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
      email: string;
      password: string;
    };
    CreateGroupData: {
      name: string;
    };
    AddMemberData: {
      email: string;
    };
    SpendigData: {
      name: string;
      /** Format: double */
      amount: number;
      /** Format: int64 */
      userId: number;
    };
    Group: {
      /** Format: int64 */
      id: number;
      name: string;
      users?: components["schemas"]["User"][];
    };
    User: {
      /** Format: int64 */
      id: number;
      email: string;
      username?: string;
    };
    Spending: {
      /** Format: int64 */
      id: number;
      name: string;
      /** Format: double */
      amount: number;
      group?: components["schemas"]["Group"];
      user?: components["schemas"]["User"];
    };
    Member: {
      /** Format: int64 */
      id: number;
      email: string;
      /** Format: double */
      totalSpent: number;
    };
  };
}

export interface operations {
  loginByPassword: {
    responses: {
      /** User's auth token */
      200: {
        content: {
          "*/*": string;
        };
      };
      /** Invalid credentials */
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
  /** Current authenticated user is added to group members by default */
  createNewGroup: {
    responses: {
      /** Created group's id */
      201: {
        content: {
          "*/*": number;
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateGroupData"];
      };
    };
  };
  /** User can only get data from its own groups */
  getGroupMembersById: {
    parameters: {
      path: {
        /** Group id */
        id: number;
      };
    };
    responses: {
      /** Group's members */
      200: {
        content: {
          "*/*": components["schemas"]["Member"][];
        };
      };
      /** Authenticated user isn't member of group */
      403: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
      /** Group not found */
      404: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
    };
  };
  addMemberToGroup: {
    parameters: {
      path: {
        /** Group id */
        id: number;
      };
    };
    responses: {
      /** Added member */
      201: {
        content: {
          "*/*": string;
        };
      };
      /** Authenticated user isn't member of group */
      403: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
      /** Group or member not found */
      404: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddMemberData"];
      };
    };
  };
  /** Creates a new spending by an user in a group */
  createNewSpending: {
    parameters: {
      path: {
        /** Group id */
        groupId: number;
      };
    };
    responses: {
      /** Created spending's id */
      201: {
        content: {
          "*/*": number;
        };
      };
      /** Authenticated user isn't member of group */
      403: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
      /** User or group not found */
      404: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SpendigData"];
      };
    };
  };
  /** Users can only get their own groups */
  getUserGroups: {
    parameters: {
      path: {
        /** User id */
        id: number;
      };
    };
    responses: {
      /** User's groups */
      200: {
        content: {
          "*/*": components["schemas"]["Group"][];
        };
      };
      /** Authenticated user doesn't have permission */
      403: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
    };
  };
  getCurrentUser: {
    responses: {
      /** User's data */
      200: {
        content: {
          "*/*": components["schemas"]["User"];
        };
      };
    };
  };
  /** User can only get data from its own groups */
  getGroupById: {
    parameters: {
      path: {
        /** Group id */
        id: number;
      };
    };
    responses: {
      /** Group's data */
      200: {
        content: {
          "*/*": components["schemas"]["Group"];
        };
      };
      /** Authenticated user isn't member of group */
      403: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
      /** Group not found */
      404: {
        content: {
          "*/*": components["schemas"]["ApiError"];
        };
      };
    };
  };
  /** Gets all spendings of a group */
  getGroupSpendings: {
    parameters: {
      path: {
        /** Group id */
        id: number;
      };
    };
    responses: {
      /** User's groups */
      200: {
        content: {
          "*/*": components["schemas"]["Spending"][];
        };
      };
    };
  };
}

export interface external {}
