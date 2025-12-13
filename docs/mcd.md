Commencer par le MCD en définissant ses tables et ses verbes avec les cardinalités
:
:
MANAGE, 11 HERO, 1N ADMIN
ADMIN: code_admin, name, email

OPINION: code_opinion, description, score
CONCERNE, 1N HERO, 11 OPINION
HERO: code_hero, name, advantage, disadvantage, price_per_mission, percent_win
HAVE, 0N HERO, 0N STUFF

ECRIT, 1N USER, 11 OPINION
DESCRIBE, 0N USER, 1N HERO
PRODUCE, 0N HERO, 01 MISSION
STUFF: code_stuff, description, statut, number

USER: code_user, name, email
REQUEST, 01 MISSION, 1N USER
MISSION: code_mission, description, status, level, city, start_date, duration