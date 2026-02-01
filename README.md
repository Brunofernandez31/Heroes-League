# Heroes League 🦸‍♂️

Site de location de super-héros - Projet d'apprentissage full-stack

## 🎯 But du projet

Progresser dans le développement web en construisant une application complète de gestion de super-héros.

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
- Conception de la base de données avec la méthode MERISE
- Création du schéma PostgreSQL
- Relations entre entités (héros, missions, clients, utilisateurs)

### Étape 4 : Authentification & API REST
- Système d'authentification sécurisé (JWT + Argon2)
- API REST hybride (routes HTML + routes API)
- Gestion des rôles (Admin, Héros, Utilisateur, Public)
- Middlewares de protection des routes
- Communication asynchrone (fetch API)

---

## 🛠️ Stack Technique

**Backend :**
- Node.js
- Express
- PostgreSQL

**Frontend :**
- EJS (templates)
- JavaScript vanilla
- fetch API

**Sécurité :**
- JWT (authentification)
- Argon2 (hachage mots de passe)

**Architecture :**
- MVC (Model-View-Controller)
- API REST
- Middlewares

---

## 📂 Structure du projet
```
/data               # Controllers et datamappers
/src
  /routers          # Routes Express
  /middlewares      # Middlewares (auth, roles)
/views              # Templates EJS
  /partials         # Composants réutilisables
/public
  /script           # Scripts JavaScript frontend
  /style            # CSS
  /ressources       # Images
```

---

## 👥 Rôles et Permissions

| Rôle | Accès |
|------|-------|
| **Public** | Consultation héros/services/témoignages, Création missions |
| **Utilisateur** | Public + Laisser des avis (inscription requise) |
| **Héros** | Consulter/prendre missions, Remplir rapports, Historique |
| **Admin** | Gestion complète (héros, missions, modération) |

---

## 🚀 Fonctionnalités actuelles

✅ Inscription et connexion utilisateur  
✅ Authentification JWT avec stockage localStorage  
✅ Création de héros (admin uniquement)  
✅ Création de missions par les clients  
✅ Rapports de mission par les héros  
✅ Calcul automatique des prix (durée × taux × urgence)  
✅ Affichage dynamique selon l'utilisateur connecté  

---

## 🔜 Fonctionnalités à venir

- Dashboard héros (voir/prendre missions disponibles)
- Gestion des témoignages (utilisateurs inscrits uniquement)
- Interface d'administration complète
- Calcul du pourcentage de réussite des héros
- Filtres et recherche de missions

---

## 📖 Conventions de code

**Routes HTML :** `/auth/register`, `/heroes`  
**Routes API :** `/api/auth/login`, `/api/heroes`  

**Règles :**
- Pas de `res.render()` dans les routes API
- Toujours utiliser les middlewares d'authentification pour les routes protégées
- Calculs sensibles (prix, etc.) toujours côté serveur

---

## 🎓 Compétences développées

- Architecture MVC
- API REST
- Authentification sécurisée
- Communication asynchrone (AJAX)
- Gestion de base de données relationnelle
- Middlewares Express
- Manipulation du DOM
- Sécurité web (XSS, validation serveur)

---

**Projet en cours de développement** 🚧
