INSERT INTO USERS
(ACCOUNT_NON_EXPIRED, ACCOUNT_NON_LOCKED, CREDENTIALS_NON_EXPIRED, EMAIL, ENABLED, PASSWORD)
VALUES
       (TRUE, TRUE, TRUE, 'alicia@test.com', TRUE, '$2a$10$w6TuekfGf8oFCBuf0WOg..LyWrGeyHJSGzduw2sP3vbKwTrz43d3u'),
       (TRUE, TRUE, TRUE, 'bernardo@test.com', TRUE, '$2a$10$lMFnxMCuKc8tlea1jnJJPOlBLMERsS42J0ojcfmlLr8n87U6eqwrK');

INSERT INTO GROUPS
(NAME)
VALUES ('testGroup'),
       ('testGroup2');

INSERT INTO GROUPS_USERS
(GROUP_ID, USERS_ID)
VALUES (1, 1)