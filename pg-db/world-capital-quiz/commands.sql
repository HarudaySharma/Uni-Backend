CREATE TABLE IF NOT EXISTS capitals (
    id SERIAL PRIMARY KEY,
    country VARCHAR(60),
    capital VARCHAR(60)
);
COPY capitals(id, country, capital)
FROM '/home/haru_d/work/Backend-Uni/pg-db/world-capital-quiz/capitals.csv'
DELIMETER ','
CSV HEADER;
