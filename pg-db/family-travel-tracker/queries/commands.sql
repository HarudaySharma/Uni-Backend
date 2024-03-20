--- m users => n countries 

CREATE TABLE countries (
    id SERIAL,
    country_code VARCHAR(2),
    country_name VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id SERIAL,
    name text,
    color text,
    PRIMARY KEY(id)
);

CREATE TABLE visited_countries (
    user_id INT,
    country_id INT,
    country_code VARCHAR(2),
    PRIMARY KEY(user_id, country_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(country_id) REFERENCES countries(id)
);
