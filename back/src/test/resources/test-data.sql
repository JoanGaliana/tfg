INSERT INTO USERS
(ACCOUNT_NON_EXPIRED, ACCOUNT_NON_LOCKED, CREDENTIALS_NON_EXPIRED, EMAIL, ENABLED, PASSWORD)
VALUES (TRUE, TRUE, TRUE, 'alicia@test.com', TRUE, '$2a$10$7eSfXu48ngO1VEMKQCb5EOJfDDZL3fRe6HJhEtLdSHzuC/x7DZdZG'),
       (TRUE, TRUE, TRUE, 'bernardo@test2.com', TRUE, '$2a$10$7eSfXu48ngO1VEMKQCb5EOJfDDZL3fRe6HJhEtLdSHzhC/x7DZdZG');

INSERT INTO GROUPS
    (NAME)
VALUES ('testGroup'),
       ('testGroup2'),
       ('testGroup3');

INSERT INTO GROUPS_USERS
    (GROUP_ID, USERS_ID)
VALUES (1, 1),
       (2, 2),
       (3, 1),
       (3, 2);

INSERT INTO SPENDINGS
    (AMOUNT, NAME, GROUP_ID, USER_ID)
VALUES (40.5, 'Hotel bill', 1, 2),
       (30.5, 'Diner', 2, 2),
       (30.5, 'Taxi', 1, 1),
       (30.5, 'Taxi', 3, 2),
       (15.0, 'Bus', 3, 2);
