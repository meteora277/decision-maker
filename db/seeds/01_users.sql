-- Users table seeds here (Example)

INSERT INTO names (name)
VALUE ('Justin')

INSERT INTO names (name)
VALUE ('Saranya')

INSERT INTO names (name)
VALUE ('Bita')

INSERT INTO names (name)
VALUE ('Uwu')

INSERT INTO names (name)
VALUE ('John')

-- one vote insert per option in poll
INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (1, 5, 1)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (2, 4, 1)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (3, 3, 1)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (4, 2, 1)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (5, 1, 1)
--

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (1, 1, 2)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (2, 5, 2)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (3, 3, 2)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (4, 2, 2)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (5, 4, 2)
--

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (1, 1, 3)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (2, 5, 3)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (3, 3, 3)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (4, 2, 3)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (5, 4, 3)
--

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (1, 5, 4)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (2, 3, 4)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (3, 4, 4)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (4, 2, 4)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (5, 1, 4)
--

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (1, 4, 5)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (2, 2, 5)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (3, 1, 5)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (4, 5, 5)

INSERT INTO votes (choice_id, vote_weight, name_id)
VALUE (5, 3, 5)
--

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Found Coffee', 'cute cafe w/ alot of plants on Queen St. West, has a cozy garden patio in the warmer months.')

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'First Wave Coffee', 'Modern coffee shop that focuses on bringing interesting coffees to market, you''l find alot of fermented flavor notes here.')

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Neo Coffee', 'Japan inspired coffee shop, barista''s make a mean pour-over. Also has many dessert options.')

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Fika Cafe', 'Swedish inspired cafe that swedish people don''t really like. Really good coffee though. Owner once won the Pour Over regionals.')

INSERT INTO choices (poll_id, title, description)
VALUES (1, 'Milky''s Coffee', 'Hipster/ Modern cafe with more pottery for sale than items on the menu, but the choices they do have are solid.')

INSERT INTO
  polls (
    email_address,
    question,
    anonymous,
    admin_link,
    poll_link,
    is_active
  )
VALUES
  (
    'justin.s.diaz@gmail.com'
    'What coffee shop should we go to on Thursday',
    FALSE,
    'xy3u70',
    'j57cxd',
    TRUE
  )


