# Heroes League 🦸‍♂️ - *Projet en cours de développement* 🚧


Site de location de super-héros - Mon premier projet full-stack

## 📖 Contexte

**Ce projet est mon tout premier projet de développement web.**

Il a débuté par une **intégration HTML/CSS statique** (recopiage intégral d'une maquette fournie par l'école) et évolue progressivement au fur et à mesure des cours suivis.

L'objectif est d'apprendre en pratiquant : chaque nouvelle notion apprise (Express, PostgreSQL, authentification, API REST) est directement appliquée sur ce projet pour le faire grandir en même temps que moi.

---

## 📚 Évolution du projet

### Étape 1 : Intégration HTML/CSS
- Reproduction d'une maquette fournie
- Entraînement aux bases du HTML et CSS

### Étape 2 : Dynamisation avec Express + EJS
- Transformation de l'intégration HTML statique en application dynamique
- Utilisation d'Express et de templates EJS
- Création d'objets de données et exports
- Travail sur les boucles EJS pour éviter la répétition
- Mise en place de l'architecture MVC :
  - Controllers
  - Routers
  - Partials
  - Connexion des composants

### Étape 3 : Base de données
- Conception de la base de données avec des Users Stories + la méthode MERISE (MCD, MLD, MDP)
- Création du schéma PostgreSQL (heroes_db.sql)
- Relations entre les entités (héros, missions, clients, users, admin..)

### Étape 4 : Authentification & API REST
- Système d'authentification sécurisé (JWT + Argon2)
- API REST hybride (routes HTML + routes API)
- Gestion des rôles (Admin, Héros, Utilisateur, Public)
- Middlewares de protection des routes
- Communication asynchrone (fetch API) (frontend <==> backend) sans rechargement de page

---

## 🛠️ Stack Technique

**Backend :**
- Node.js
- Express
- PostgreSQL
- Argon2 (hachage de mots de passe)
- JWT (authentification par token)
- CORS (gestion des origines autorisées)

**Frontend :**
- EJS (templates)
- JavaScript vanilla
- Fetch API

**Architecture :**
- MVC (Model-View-Controller)
- API REST
- Middlewares

---

## 📂 Structure du projet

```
heroes-league/
├── src/
│   ├── controllers/        # Logique métier (auth, héros, missions)
│   ├── models/             # Vide pour l'instant (ORM bientôt)
│   ├── middlewares/        # authenticateToken, isAdmin, isHero
│   ├── routers/            # Routes Express (HTML + API)
│   ├── config/             # Configuration BDD + Datamappers (requêtes SQL)
│   └── data/               # Données statique à implanter (services.js)
├── views/                  # Templates EJS
│   └── partials/           # Header, footer
├── public/
│   ├── script/             # Scripts JavaScript frontend
│   ├── style/              # Reset + CSS
│   └── ressources/         # Images
├── index.js                # Point d'entrée de l'application
└── package.json
```

---

## 👥 Rôles et Permissions

| Rôle | Accès |
|------|-------|
| **Admin** | Gestion complète (création héros, modération) |
| **Héros** | Consulter/prendre missions, Remplir rapports, Dashboard |
| **Utilisateur** | Public + Laisser des avis (après inscription) |
| **Public** | Consultation héros/services/témoignages, Création missions |

---

## 🚀 Fonctionnalités actuelles

✅ **Authentification sécurisée**
- Inscription/connexion avec hash Argon2 + JWT
- Gestion du token dans localStorage
- Suppression automatique si token expiré

✅ **Gestion des héros**
- Création de héros par l'admin (génère un compte users + hero)
- Affichage public des héros avec leurs stats
- Middlewares de protection des routes (isAdmin, isHero)

✅ **Système de missions**
- Formulaire client "Sauvez-moi" pour créer une mission
- Dashboard héros : voir missions disponibles + missions assignées
- Prendre une mission (vérification : 1 seule mission en cours max)
- Rapports de mission avec preview modal
- Calcul automatique du prix : `taux horaire × durée × coefficient d'urgence`

✅ **UX et gestion des erreurs**
- Toast notifications (succès/erreur)
- Loader pendant les requêtes
- Messages d'erreur clairs depuis le backend
- Header dynamique selon le rôle connecté

---

## 🔜 Fonctionnalités à venir

- Coloration des cartes missions (selon urgence et résultat)
- Historique des missions terminées du héro
- Calcul automatique du pourcentage de réussite
- Interface admin complète (modifier/supprimer héros)
- Page listant toutes les missions avec filtres
- Système d'avis clients après mission
- IA pour suggérer l'équipements du héro selon la mission décrite

---

## 🔐 Sécurité et bonnes pratiques

- **Mots de passe** : hashés avec Argon2 (jamais stockés en clair)
- **Authentification** : JWT avec expiration 24h
- **Routes protégées** : middlewares `authenticateToken`, `isAdmin`, `isHero`
- **Calculs sensibles** : prix, durées → toujours calculés côté serveur
- **Validation** : données utilisateur vérifiées avant traitement
- **CORS** : configuration pour limiter les origines autorisées

---

## 📖 Conventions de code

**Routes :**
- Routes HTML : `/auth/register`, `/heroes`, `/dashboard`
- Routes API : `/api/auth/login`, `/api/heroes`, `/api/dashboard`

**Règles :**
- Pas de `res.render()` dans les routes API (uniquement JSON)
- Toujours passer par les middlewares pour les routes protégées
- Séparation claire : controllers (logique) <==> datamappers (BDD)

---

## 🎓 Compétences développées

- Architecture MVC
- API REST hybride (HTML + JSON)
- Conception BDD avec MERISE (MCD, MLD)
- Création BDD avec PostgreSQL
- Communication asynchrone (fetch, AJAX)
- Manipulation du DOM
- Middlewares Express (authentification, rôles)
- Authentification sécurisée (JWT, Argon2)
- Sécurité web (hachage, validation serveur, protection XSS)
- Gestion des erreurs et UX (toasts, loaders)

---

**Projet en cours de développement** 🚧
