INSERT INTO USERS
(ACCOUNT_NON_EXPIRED, ACCOUNT_NON_LOCKED, CREDENTIALS_NON_EXPIRED, EMAIL, ENABLED, PASSWORD)
VALUES (TRUE, TRUE, TRUE, 'alicia@test.com', TRUE, '$2a$10$w6TuekfGf8oFCBuf0WOg..LyWrGeyHJSGzduw2sP3vbKwTrz43d3u'),
       (TRUE, TRUE, TRUE, 'bernardo@test.com', TRUE, '$2a$10$lMFnxMCuKc8tlea1jnJJPOlBLMERsS42J0ojcfmlLr8n87U6eqwrK');

INSERT INTO GROUPS
    (NAME)
VALUES ('Viaje Madrid'),
       ('Casa'),
       ('Cenas'),
       ('Trabajo'),
       ('Compra'),
       ('Cumpleaños Marta'),
       ('Padel'),
       ('Viaje Valencia'),
       ('Pipas');

INSERT INTO GROUPS_USERS
    (GROUP_ID, USERS_ID)
VALUES (1, 1)
     , (1, 2)
     , (2, 1)
     , (3, 1)
     , (4, 1)
     , (4, 2)
     , (5, 1)
     , (6, 1)
     , (7, 1)
     , (8, 1)
     , (9, 2);

INSERT INTO SPENDINGS
(AMOUNT, NAME, GROUP_ID, USER_ID)
VALUES (40.5, 'Hotel', 1, 2),
       (30.5, 'Comida', 2, 2),
       (30.5, 'Taxi', 1, 1),
       (40.3, 'Compra agua', 4, 1),
       (10, 'Compra clips', 4, 1);