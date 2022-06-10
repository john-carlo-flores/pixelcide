-- schema/02_create_urls.sql
DROP TABLE IF EXISTS urls CASCADE;
-- CREATE URLS
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  long_url character varying(255) NOT NULL,
  short_url character varying(255) NOT NULL,
  favorite boolean NOT NULL DEFAULT false
);