DROP TABLE IF EXISTS cards CASCADE;

CREATE TABLE cards (
  id SERIAL PRIMARY KEY NOT NULL,
  tag VARCHAR(255) NOT NULL,
  suit VARCHAR(255) NOT NULL,
  health smallint,
  damage smallint NOT NULL,
  image_front VARCHAR(255) NOT NULL
  image_back VARCHAR(255) NOT NULL
);