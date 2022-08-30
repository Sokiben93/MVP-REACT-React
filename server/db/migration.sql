-- psql -f db/migration.sql

-- Show all the tables (this is a psql command). \dt
-- Show all the users (this is a psql command). \du
-- Show all the data about the owners table (this is a psql command). \d users

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    user_id serial PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);

INSERT INTO users(username, password) VALUES('Le', 'Le');
INSERT INTO users(username, password) VALUES('Anna', 'Anna');

DROP TABLE IF EXISTS posts;
CREATE TABLE posts(
	post_id SERIAL PRIMARY KEY,
	title TEXT,
	comment TEXT,
	mail TEXT,
	user_id INTEGER NOT NULL,
	CONSTRAINT fk_posts_user  
	FOREIGN KEY (user_id)  
	REFERENCES users (user_id)   
	ON DELETE CASCADE   
);

INSERT INTO posts(title, comment, mail, user_id) VALUES('HW', 'Deadline in Mon','mementoboy@gmail.com', 1);
INSERT INTO posts(title, comment, mail, user_id) VALUES('Friday night', 'Play on the beach','gonegirl@gmail.com', 2);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
	comment_id SERIAL PRIMARY KEY,
	commentofpost TEXT NOT NULL,
	post_id INTEGER NOT NULL
);

INSERT INTO comments(commentofpost, post_id) VALUES('Cool', 1);
INSERT INTO comments(commentofpost, post_id) VALUES('Great', 2);
-- {
--     "title": "SUNDAY MY DAY",
--     "comment": "Shopping with my girl",
--     "mail": "mementoboy@gmail.com",
--     "user_id": 1
--   }