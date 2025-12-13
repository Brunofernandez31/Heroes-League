ADMIN (id_admin, name, email)

HERO (id_hero, name, advantage, disadvantage, price_per_mission, percent_win, #id_admin)

MISSION (id_mission, description, status, level, city, start_date, duration, #id_user, #id_hero)

OPINION (id_opinion, description, score, #id_user, #id_hero)

STUFF (id_stuff, description, statut, number)

USER (id_user, name, email)

DESCRIBE (#id_hero, #id_user) ==> Table de liaison

HAVE (#id_hero, #id_stuff) ==> Table de liaison