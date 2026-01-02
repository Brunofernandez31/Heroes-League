En premier création de la BDD
Supprimer les datas heroes, services, testimonies

Creer un dossier models
Faire un fichier pour se co sur la BDD
Faire des fichiers models
=> Reunir les fonctions principales qui vont piocher dans la BDD dans un main model (data-mapper) avec des fonctions qui font des requetes SQL

CREATE USER brubru_hero WITH PASSWORD 'hero';


18/12/25
Model heroes à faire
Datamapper à faire
main controller à faire


02/01/2026

Idée :
Un client demande une mission à l'agence
Il remplit dans le champ de formulaire son nom, son mail sa ville, le degres d'urgence et un message sur le but de la mission.
La durée sera donnée par le héro lorsqu'il aura rempli son rapport de fin de mission et donc le montant total sera calculé avec son coût horaire de manière dynamique
Suivant le degres d'urgence choisit si c'est sous 3 jours ou une demande immédiate alors il y aura un supplément à payer de 3% ou 15% calculé de manière dynamique aussi
Une sélection filtrée de quelques héros apparaitra alors en fonction du lieu d'action du héro
Il sélectionne son héro parmis les choix, une fois sélectionné, une fenêtre à côté du héro disant "En cours de mission" sera affichée

Bonus : 
- introduire l'IA qui va choisir parmis la liste de stuff de la BDD 3 equipements pouvant être adéquat en fonction de la mission
- Faire une authentification