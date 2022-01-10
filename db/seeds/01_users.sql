
INSERT INTO
  polls (
    email_address,
    question,
    admin_link,
    poll_link,
    is_active,
    anonymous
  )
VALUES
  (
    'justin.s.diaz@gmail.com',
    'What coffee shop should we go to on Thursday',
    'xy3u70',
    'j57cxd',
    TRUE,
    FALSE
  );

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Found Coffee', 'cute cafe w/ alot of plants on Queen St. West, has a cozy garden patio in the warmer months.');

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'First Wave Coffee', 'Modern coffee shop that focuses on bringing interesting coffees to market, you''l find alot of fermented flavor notes here.');

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Neo Coffee', 'Japan inspired coffee shop, barista''s make a mean pour-over. Also has many dessert options.');

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Fika Cafe', 'Swedish inspired cafe that swedish people don''t really like. Really good coffee though. Owner once won the Pour Over regionals.');

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Milky''s Coffee', 'Hipster/ Modern cafe with more pottery for sale than items on the menu, but the choices they do have are solid.');

INSERT INTO names (name)
VALUES ('Justin');

INSERT INTO names (name)
VALUES('Saranya');

INSERT INTO names (name)
VALUES ('Bita');

INSERT INTO names (name)
VALUES ('Uwu');

INSERT INTO names (name)
VALUES ('John');

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (1, 1, 3);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (2, 5, 3);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (3, 3, 3);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (4, 2, 3);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (5, 4, 3);
--

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (1, 5, 4);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (2, 3, 4);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (3, 4, 4);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (4, 2, 4);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (5, 1, 4);
--

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (1, 4, 5);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES(2, 2, 5);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (3, 1, 5);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (4, 5, 5);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (5, 3, 5);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (1, 5, 1);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (2, 4, 1);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (3, 3, 1);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (4, 2, 1);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (5, 1, 1);
--

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (1, 1, 2);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (2, 5, 2);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (3, 3, 2);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES(4, 2, 2);

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUES (5, 4, 2);



INSERT INTO
  polls (
    email_address,
    question,
    anonymous,
    admin_link,
    poll_link,
    is_active
  );
VALUES
  (
    'justin.s.diaz@gmail.com',
    'Should you watch Arcane on Netflix',
    FALSE,
    'mm3uwu',
    'j57cxd',
    TRUE
  );
--

INSERT INTO choices (poll_id, title, description)
VALUES (2, 'Yes', 'cute cafe w/ alot of plants on Queen St. West, has a cozy garden patio in the warmer months.');

INSERT INTO choices (poll_id, title, description)
VALUES (3, 'No', 'Modern coffee shop that focuses on bringing interesting coffees to market, you''l find alot of fermented flavor notes here.');



-- INSERT INTO names (name)
-- VALUES ('Mel');

-- INSERT INTO names (name)
-- VALUES ('TJ');

-- INSERT INTO names (name)
-- VALUES ('Wiggles');

-- INSERT INTO names (name)
-- VALUES ('Octavia');

-- INSERT INTO names (name)
-- VALUES ('Frieda');


-- -- one vote insert per option in poll
-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 2, 1);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 1, 1);


-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 1, 2);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 2);

-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 1, 3);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 3);

-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 1, 4);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 4);

-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 1, 5);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 5);

-- --


-- INSERT INTO names (name)
-- VALUES ('Mel');

-- INSERT INTO names (name)
-- VALUES ('TJ');

-- INSERT INTO names (name)
-- VALUES ('Wiggles');

-- INSERT INTO names (name)
-- VALUES ('Octavia');

-- INSERT INTO names (name)
-- VALUES ('Frieda');


-- -- one vote insert per option in poll
-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 2, 1);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 1, 1);


-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 1, 2);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 2);

-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES(1, 1, 3);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 3);

-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 1, 4);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 4);

-- --

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (1, 1, 5);

-- INSERT INTO votes (choice_id, vote_weight, name_id)
-- VALUES (2, 2, 5);

-- --

-- INSERT INTO choices (poll_id, title, description)
-- VALUES (2, 'Yes', 'cute cafe w/ alot of plants on Queen St. West, has a cozy garden patio in the warmer months.');

-- INSERT INTO choices (poll_id, title, description)
-- VALUES (3, 'No', 'Modern coffee shop that focuses on bringing interesting coffees to market, you''l find alot of fermented flavor notes here.');


-- INSERT INTO
--   polls (
--     email_address,
--     question,
--     anonymous,
--     admin_link,
--     poll_link,
--     is_active
--   );
-- VALUES
--   (
--     'justin.s.diaz@gmail.com',
--     'Should you watch Arcane on Netflix',
--     FALSE,
--     'mm3uwu',
--     'j57cxd',
--     TRUE
--   );




