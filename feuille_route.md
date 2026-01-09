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

du 04/01/2026 au 09/01/2026

## ✅ CE QUI EST FAIT

### Côté client (formulaire création de mission)

- ✅ Formulaire "Sauvez-moi" qui crée un client + mission
- ✅ Route GET `/sauvez-moi` pour afficher le formulaire
- ✅ Route POST `/sauvez-moi` pour traiter le formulaire
- ✅ Logique : vérifier si client existe, sinon créer le client, puis créer la mission
- ✅ Sécurité : Ne jamais faire confiance au client (validation côté serveur des prix et des calculs)

### Côté héros (rapport de mission)

**Formulaire et routes :**
- ✅ Formulaire de rapport de mission
- ✅ Route GET `/rapport_mission/:id` pour afficher le formulaire
- ✅ Route POST `/rapport_mission/:id/preview` pour prévisualisation AJAX
- ✅ Route POST `/rapport_mission/:id` pour soumission finale

**Prévisualisation (modal AJAX) :**
- ✅ Bouton "Afficher" qui ouvre une modal sans recharger la page
- ✅ Communication Frontend ↔ Backend avec `fetch()` et JSON
- ✅ Calcul du total sécurisé côté backend (prix × durée × supplément)
- ✅ Formatage intelligent (durée en heures/minutes + le texte lié à l'urgence)
- ✅ Affichage des données dans la modal

**Soumission et UPDATE BDD :**
- ✅ Bouton "Envoyer le rapport" qui soumet le formulaire classique
- ✅ UPDATE de la mission dans la BDD 
- ✅ UPDATE du héros : `nb_mission` incrémenté
- ✅ Redirection après soumission du formulaire

---

## 🎯 CE QU'IL RESTE (Optionnel)

### Améliorations UX
- le CSS
- Gestion des erreurs (try/catch dans le fetch)

### Fonctionnalités avancées
- ⚪ Calculer le pourcentage de réussite du héros (`nb_success / nb_mission`)
- ⚪ Page listant toutes les missions
- ⚪ Filtrer les missions par statut (Disponible, En cours, Terminée)
- ⚪ Permettre au client de choisir un héros pour sa mission

---

**Dernière mise à jour :** 10/01/2026