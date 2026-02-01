# HEROES LEAGUE - Feuille de route

## ✅ Fonctionnalités terminées

### Base de données et architecture (novembre 2024 - décembre 2024)
- BDD PostgreSQL avec tables users, hero, mission, client, opinion, stuff
- Architecture MVC : controllers dans src/controllers/, datamappers dans src/models/, config dans src/config/
- Rôles définis : Public, User, Hero, Admin

### Authentification et autorisation (décembre 2025)
- Inscription/connexion avec JWT (24h) et Argon2
- Middlewares : `authenticateToken`, `isAdmin`, `isHero`
- Header dynamique selon le rôle connecté
- Routes API protégées par token et rôle
- Gestion token expiré avec suppression localStorage

### Gestion des missions (janvier 2026)
- **Client** : Formulaire "Sauvez-moi" pour créer une mission
- **Héro** : Formulaire rapport de mission avec une prévisualisation
- Calcul dynamique du prix de la mission en fonction de la durée et de l'urgence
- Maj mission (durée, commentaires, résultat, prix total)
- Incrémentation de nombre de mission du héro

### Dashboard héros (janvier 2026)
- Affichage de toutes les missions disponibles + missions assignées au héro
- Tri : missions assignées au héro en premier et en status "En cours", puis ensuite triées par urgence
- Prendre une mission fait un PATCH ==> status "En cours"
- Vérification : 1 seule mission en cours max par héro
- Bouton "Terminer" ==> redirection vers le rapport de mission auto remplie avec les informations de bases (id client, l'urgence etc..)

### Création de héros (janvier 2026)
- Formulaire admin pour créer un héro (email, password, avantages, prix/h, etc.)
- Création automatique de 2 entrées en BDD :
  - Un compte dans `users` (role='hero') pour que le héro puisse se connecter
  - Une fiche dans `hero` avec ses caractéristiques (prix, compétences, stats)
- Liaison automatique : l'id du compte users est stocké dans la fiche hero
- Traçabilité : on enregistre quel admin a créé le héro

### UX et gestion des erreurs (février 2026)
- Toast notifications (dashboard, login, register, createHero) + dans les erreurs et en pour la suppression du token
- Loader pendant l'affichage de toutes les missions en dashboard

---

## 📋 À continuer

### Missions
- Historique des missions terminées du héro
- Calcul automatique du pourcentage de victoire en fonction des missions réussies ou échouées
- Permettre au client de choisir un héro spécifique pour sa mission

### Interface admin
- Page admin listant toutes les missions avec quelques filtres (statut, urgence, héro)
- Dashboard admin : voir tous les héros, toutes les missions
- Modifier un héro existant (PUT /api/heroes/:id)
- Supprimer un héro (DELETE /api/heroes/:id)
- Modération des missions

### UX générale
- Améliorer le CSS global (page d'accueil, services, témoignages)
- Validation des formulaires côté client avant envoi
- Page profil utilisateur pour modifier ses infos

### UX amélioration dashboard héros
- Coloration des cartes selon statut (success → vert, failed → gris)
- Coloration des cartes selon urgence (immediate → rouge, threeDays → orange, hebdomadaire → jaune)
- Style des cartes : border-radius, over + box-shadow etc..
---

## 💡 Bonus / Idées futures

- IA qui sélectionne 3 équipements de la table `stuff` selon la description de la mission du client
- Système d'avis clients sur les héros après la mission terminée
- Notifications en temps réel (WebSocket) quand une nouvelle mission est disponible
