CREATE table "admin" (
    id_admin SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150)
);

CREATE table "user" (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(150)
);

CREATE table "stuff" (
    id_stuff SERIAL PRIMARY KEY,
    description TEXT,
    statut BOOLEAN NOT NULL,
    stock SMALLINT NOT NULL
);

CREATE table "hero" (
    id_hero SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    advantage TEXT,
    disadvantage TEXT,
    price_per_mission DECIMAL (7,2) NOT NULL, 
    percent_win DECIMAL (5,2) CHECK (percent_win BETWEEN 0 AND 100), 
    id_admin INT NOT NULL REFERENCES admin(id_admin)
);

CREATE table "mission" (
    id_mission SERIAL PRIMARY KEY,
    description TEXT,
    status BOOLEAN NOT NULL,
    level SMALLINT,
    city VARCHAR (255) NOT NULL,
    start_date DATE,
    duration INTERVAL NOT NULL,
    id_user REFERENCES user(id_user),
    id_hero REFERENCES hero(id_hero)
);

CREATE table "opinion" (
    id_opinion SERIAL PRIMARY KEY,
    description TEXT,
    score SMALLINT,
    id_user INT NOT NULL REFERENCES user(id_user),
    id_hero INT NOT NULL REFERENCES hero(id_hero)
);

CREATE table "describe" (
    id_hero INT NOT NULL REFERENCES hero(id_hero),
    id_stuff INT NOT NULL REFERENCES stuff(id_stuff),
    PRIMARY KEY (id_hero, id_stuff)
);

CREATE table "have" (
    id_hero INT NOT NULL REFERENCES hero(id_hero),
    id_stuff INT NOT NULL REFERENCES stuff(id_stuff),
    PRIMARY KEY (id_hero, id_stuff)
);