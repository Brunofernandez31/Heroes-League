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
    stock SMALLINT NOT NULL,
    manufacturing_time INTERVAL NOT NULL
);

CREATE table "hero" (
    id_hero SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    advantage TEXT,
    disadvantage TEXT,
    price_per_hour DECIMAL (7,2), 
    percent_win DECIMAL (5,2) CHECK (percent_win BETWEEN 0 AND 100) DEFAULT 100, 
    id_admin INT NOT NULL REFERENCES "admin"(id_admin),
    other_price VARCHAR(255),
    img_hero VARCHAR(255),
    nb_mission SMALLINT
);

CREATE TYPE mission_status AS ENUM ('Disponible', 'En cours', 'Terminée');

CREATE table "mission" (
    id_mission SERIAL PRIMARY KEY,
    description TEXT,
    level SMALLINT,
    city VARCHAR (255) NOT NULL,
    start_date DATE,
    duration INTERVAL NOT NULL,
    id_user INT NOT NULL REFERENCES "user"(id_user),
    id_hero INT REFERENCES "hero"(id_hero),
    status mission_status NOT NULL DEFAULT 'Disponible'
);

CREATE table "opinion" (
    id_opinion SERIAL PRIMARY KEY,
    description TEXT,
    id_user INT NOT NULL REFERENCES "user"(id_user),
    id_hero INT NOT NULL REFERENCES "hero"(id_hero),
    score SMALLINT NOT NULL CHECK (score BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

INSERT INTO "admin" (name, email)
VALUES ('BruBru', 'brubru@heroes_leagues.fr');

INSERT INTO "user" (name, email)
VALUES
    ('Marie Dupont', 'marie.dupont@email.com'),
    ('Jean Martin', 'jean.martin@email.com'),
    ('Sophie Bernard', 'sophie.bernard@email.com'),
    ('Luc Petit', 'luc.petit@email.com'),
    ('Emma Roux', 'emma.roux@email.com');

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
    ('Cartons de déménagement', 'Tachés d''encre mais pré scotché', TRUE, 8, '30 minutes'),
    
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

INSERT INTO "hero" (name, advantage, disadvantage, price_per_hour, id_admin, other_price, img_hero, nb_mission)
VALUES
    ('Cat Astrophic', 
    'Avec son super ronron, il saura vous réconforter dans n''importe quelle situation.', 
    'Ne contrôle pas tout à fait sa patte droite, et peut être amené à vous mettre une - plus ou moins petite - tape sur la tête. Se perd de temps en temps', 
    50, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Une box de super croquettes de la marque CalinCat',
    'catastrophic.png', 34),

    ('Carotte Woman', 
    'Mis à part son apparence de carotte, il est champion du Monde de straégie en botanique mais on peut lui trouver une meilleur utilité', 
    'Attention, elle essaiera souvent de vous faire payer plus que le prix convenu avec Heros League. N''acceptez pas.', 
    30, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Un lapin en civet avec la photo de son chasseur ou du terreau BioNucléaire',
    'carotte_woman.png', 12),

    ('Ultraquenarde', 
    'Peut vous sortir de n''importe quel traquenard.', 
    'Vous sort du traquenard… Mais il arrive qu''elle vous entraîne dans un autre.', 
    75, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Un kit d''évasion professionnel ou un autographe du professeur de la Casa de Papel',
    'ultraquenarde.png', 45),

    ('Poulpy', 
    'Il a des tentacules gigantesques, super pratique pour les déménagements.', 
    'Un peu collant et sent la marais', 
    40, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Un assortiment de crabes exotiques frais ou la derniere veste du styliste Dr Octopus',
    'poulpy.png', 52),

    ('Orang Wu-Tang Clan', 
    'Un gros singe agile, multi-tâche, qui intervient tout en rappant.', 
    'Peut être amené à vous demander de financer son prochain album, ne pas accepter.', 
    60, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Des bananes premium et un micro neuf ou un albumn en featuring avec lui',
    'oran-wu-tang-clan.png', 63),

    ('Superimé', 
    'Un vieux super-héro qui ne veut pas partir à la retraite.', 
    'N''a plus de pouvoir mais refuse de l''admettre, peut être amené à vous raconter des histoires de l''époque où il était encore super.', 
    20, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Une entrée pour visiter une maison de retraite de luxe ou des pantoufles collector de Tortue Genial',
    'superime.png', 1785),

    ('Capitaine Glue', 
    'Peut coller n''importe quoi à n''importe quoi ou n''importe qui. Très utile pour réparer, immobiliser des ennemis, ou recoller les pots cassés… au sens propre.', 
    'Tout ce qu''il touche reste collé pendant 48h. Y compris vous, si vous lui serrez la main. Evitez évidemment de lui faire la bise', 
    55, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Un assortiment de colle haut de gamme ou de la teinture pour colle de chez Castoracolleur',
    'capitaine-glu.png',78),

    ('Prune Power', 
    'Spécialiste des situations coincées. Peut vous sortir d''une contravention injuste ou d''une constipation rebelle grâce à ses pouvoirs laxatifs naturels.', 
    'Ne fait pas la différence entre les problèmes métaphoriques et digestifs. Peut résoudre votre dispute administrative en vous donnant la diarrhée.', 
    45, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Une caisse de vin de pruneaux d''Agen AOC ou de la crême Premium pour avoir une peau de pêche', 'prunePower.png', 91),

    ('Fidélidog', 
    'Sens du devoir surdéveloppé et flair infaillible pour les gens en détresse. Peut vous retrouver n''importe où, vous protéger de n''importe quoi, et rapporter n''importe quel objet perdu.', 
    'Toujours fidèle, parfois trop. A tendance à "sauver" les gens qui n''ont rien demandé, surtout les facteurs, les livreurs, et les chats qu''il considère en danger.', 
    35, 
    (SELECT id_admin FROM "admin" WHERE name = 'BruBru'), 
    'Un os à mâcher géant ou la super balle magique qui se jette toute seule', 'fidelidog.png', 42);

INSERT INTO "mission" (description, level, city, start_date, duration, id_user, id_hero, status)
VALUES 
    ('Mon chat est coincé dans un arbre depuis 2 jours. Il refuse de descendre et commence à miauler désespérément. Besoin d''aide urgente !', 
    2, 
    'Paris', 
    '2024-12-20', 
    '1 hour', 
    (SELECT id_user FROM "user" WHERE name = 'Marie Dupont' LIMIT 1),
    NULL,
    'Disponible'),
    
    ('Déménagement d''un piano à queue du 5ème étage sans ascenseur. Objet fragile et très lourd. Cherche héros costaud et délicat.', 
    5, 
    'Lyon', 
    '2024-12-22', 
    '3 hours', 
    (SELECT id_user FROM "user" WHERE name = 'Jean Martin' LIMIT 1),
    NULL,
    'Disponible'),
    
    ('J''ai perdu mes clés quelque part dans la ville. Aucune idée où. Besoin de quelqu''un avec un flair exceptionnel pour les retrouver.', 
    3, 
    'Marseille', 
    '2024-12-21', 
    '2 hours', 
    (SELECT id_user FROM "user" WHERE name = 'Sophie Bernard' LIMIT 1),
    NULL,
    'Disponible'),
    
    ('Ma mère ne me parle plus depuis que j''ai oublié son anniversaire. Besoin d''un médiateur pour arranger les choses.', 
    1, 
    'Toulouse', 
    '2024-12-23', 
    '30 minutes', 
    (SELECT id_user FROM "user" WHERE name = 'Luc Petit' LIMIT 1),
    NULL,
    'Disponible'),
    
    ('Mon voisin a collé son canapé contre ma porte d''entrée par vengeance. Je ne peux plus sortir de chez moi. SOS !', 
    4, 
    'Bordeaux', 
    '2024-12-24', 
    '1 hour 30 minutes', 
    (SELECT id_user FROM "user" WHERE name = 'Emma Roux' LIMIT 1),
    NULL,
    'Disponible');

