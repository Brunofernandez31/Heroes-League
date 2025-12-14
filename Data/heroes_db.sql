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
    article VARCHAR(255),
    description_article TEXT,
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
    id_admin INT NOT NULL REFERENCES "admin"(id_admin)
);

CREATE table "mission" (
    id_mission SERIAL PRIMARY KEY,
    description TEXT,
    status BOOLEAN NOT NULL,
    level SMALLINT,
    city VARCHAR (255) NOT NULL,
    start_date DATE,
    duration INTERVAL NOT NULL,
    id_user INT NOT NULL REFERENCES "user"(id_user),
    id_hero INT NOT NULL REFERENCES "hero"(id_hero)
);

CREATE table "opinion" (
    id_opinion SERIAL PRIMARY KEY,
    description TEXT,
    score SMALLINT,
    id_user INT NOT NULL REFERENCES "user"(id_user),
    id_hero INT NOT NULL REFERENCES "hero"(id_hero)
);

CREATE table "describe" (
    id_hero INT NOT NULL REFERENCES "hero"(id_hero),
    id_stuff INT NOT NULL REFERENCES "stuff"(id_stuff),
    PRIMARY KEY (id_hero, id_stuff)
);

CREATE table "have" (
    id_hero INT NOT NULL REFERENCES "hero"(id_hero),
    id_stuff INT NOT NULL REFERENCES "stuff"(id_stuff),
    PRIMARY KEY (id_hero, id_stuff)
);

INSERT INTO "amdin" (name, email)
VALUES (BruBru, brubru@heroes_leagues.fr);

INSERT INTO "user" (name, email)
VALUES (client, client@heroes_leagues.fr);

INSERT INTO "stuff" (article, description_article, statut, stock, manufacturing_time)
VALUES 
    -- Cat Astrophic
    ('Balles de laine anti-stress', 'Pour le confort des victimes', TRUE, 3, '3 days'),
    ('Griffoir géant portatif', 'Pour les griffades d''urgence', TRUE, 2, '5 days'),
    ('Collier GPS', 'Pour retrouver Cat Astrophic', TRUE, 1, '10 days'),
    
    -- Carotte Woman
    ('Calculatrice truquée', 'Pour maitriser toutes les transactions frauduleuses', TRUE, 1, '1 day'),
    ('Faux contrats', 'En double exemplaire', TRUE, 2, '6 hours'),
    ('Éplucheur de secours', 'Au cas où on a du mal à s''épeler', TRUE, 1, '12 hours'),
    
    -- Ultraquenarde
    ('Carte des pièges', 'Périmée de 10 ans', TRUE, 1, '5 days'),
    ('Corde d''escalade emmêlée', 'Très pratique pour perdre du temps', TRUE, 2, '1 day'),
    ('Boussole déréglée', 'Pointe toujours vers le sud', TRUE, 3, '2 days'),
    
    -- Poulpy
    ('Ventouses de rechange', 'Quand les autres tombent ou pour accrocher son téléphone', TRUE, 50, '3 hours'),
    ('Déodorant spécial tentacules', 'Efficacité très limitée', TRUE, 5, '1 day'),
    ('Cartons de déménagement', 'Tachés mais pré scotché', TRUE, 8, '30 minutes'),
    
    -- Orang Wu-Tang Clan
    ('Micro cassé', 'A trop servi en tant que projectile', TRUE, 2, '2 days'),
    ('Démo CD', 'Mon prochain album, sert plus de miroir qu''autre chose', TRUE, 20, '1 hour'),
    ('Banane géante', 'Pour les cascades ou faire déraper les véhicules', TRUE, 4, '6 hours'),
    
    -- Superimé 
    ('Canne à pommeau magique', 'Qui ne marche plus mais sert de béquille', TRUE, 1, '4 days'),
    ('Album photo années 40', 'Pour vous raconter sa vie', TRUE, 1, '1 day'),
    ('Prothèse auditive', 'Pour le style, n''est jamais allumée', TRUE, 2, '2 days'),
    
    -- Capitaine Glue
    ('Tube de décollant industriel', 'Souvent vide et pas forcément fonctionnel', TRUE, 4, '1 day'),
    ('Gants antiadhésifs', 'Pour que les clients ne restent pas scotchés à leurs affaires', TRUE, 2, '12 hours'),
    ('Spatule éclatante', 'Pour décoller ce qui colle', TRUE, 1, '18 hours'),
    
    -- Prune Power
    ('Code de la route', 'Annoté avec des taches et des fautes', TRUE, 1, '3 days'),
    ('Papier toilette de secours', 'Très important et parfum mirabelle', TRUE, 20, '1 hour'),
    ('Stylo gommeur', 'Pour contester les PV', TRUE, 3, '2 hours'),
    
    -- Fidelidog
    ('Laisse XXL', 'Qu''il traîne derrière lui', TRUE, 1, '1 day'),
    ('Os en caoutchouc indestructible', 'Son préféré', TRUE, 5, '6 hours'),
    ('Collier avec médaille', 'NE PAS NOURRIR - EN SERVICE', TRUE, 1, '2 days'),
    
    -- Objets génériques
    ('Kit de premier secours', 'Entamé', TRUE, 10, '1 day'),
    ('Talky Walky', 'Voyant de batterie HS, on ne sait pas à l''avance s''ils fonctionnent', TRUE, 6, '12 hours'),
    ('Cape altérée', 'Déchirée et pas toujours lavée mais elle tient chaud', TRUE, 3, '1 day'),
    ('The Mask', 'Vous serez d''humeur cartoon avec une voix modifiée', TRUE, 1, '7 days'),
    ('Lano', 'Pratique pour se marier en urgence mais ils SAURON que vous l''avez', TRUE, 1, '14 days'),
    ('Cape Huccino', 'Elle fait le café mais augmente votre tension, pas pour les cardiaques', TRUE, 3, '8 hours');