DROP TABLE IF EXISTS polls CASCADE;
DROP TABLE IF EXISTS choices CASCADE;
DROP TABLE IF EXISTS votes CASCADE;


CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  question TEXT NOT NULL,
  poll_link VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  choice_id INTEGER NOT NULL REFERENCES choices(id) ON DELETE CASCADE,
  name VARCHAR(255)
);

