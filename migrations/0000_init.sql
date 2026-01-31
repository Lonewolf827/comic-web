CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT);
CREATE TABLE comics (id INTEGER PRIMARY KEY, title TEXT, cover TEXT, slug TEXT);
CREATE TABLE bookmarks (user_id INTEGER, comic_id INTEGER, PRIMARY KEY(user_id, comic_id));
CREATE TABLE history (user_id INTEGER, comic_id INTEGER, read_at DATETIME DEFAULT CURRENT_TIMESTAMP);