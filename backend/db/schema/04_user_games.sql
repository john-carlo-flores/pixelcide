DROP TABLE IF EXISTS user_games CASCADE;

CREATE TABLE user_games (
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  game_id integer REFERENCES games(id) ON DELETE CASCADE NOT NULL
);