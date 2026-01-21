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

# 🚀 FEUILLE DE ROUTE - API & AUTHENTIFICATION

## 🎯 OBJECTIF
✅ Ajouter une API REST avec authentification au projet Heroes League. - 11/01/2026

---

## 👥 RÔLES ET PERMISSIONS

✅ Définition des rôles (Public, Utilisateur, Héros, Admin) - 11/01/2026

| Rôle | Peut faire |
|------|-----------|
| **Public (non connecté)** | Consulter héros/services/témoignages, Créer des missions |
| **Utilisateur (inscrit)** | Tout ce que le public + Laisser des avis |
| **Héros (compte créé par admin)** | Consulter/prendre missions, Remplir rapports, Voir historique |
| **Admin (toi)** | TOUT + Gérer héros, Modération |

---

## 📊 MODIFICATIONS BDD

✅ Table `users` créée (id_user, email, password, role, firstname, lastname, created_at) - 11/01/2026  
✅ Contrainte CHECK sur le rôle (user, hero, admin) - 11/01/2026  
✅ Colonnes `comments` et `total_price` ajoutées à la table `mission` - 11/01/2026  
✅ Colonne `mission_result` (ENUM success/failed) ajoutée à la table `mission` - 11/01/2026  

**Logique :**
- **Client non inscrit** → `id_user = NULL` (peut quand même créer des missions)
- **Client inscrit** → `id_user` rempli (peut laisser des avis)
- **Héros** → Toujours un `id_user` (créé par l'admin)

---

## 🔐 AUTHENTIFICATION & SÉCURITÉ

### **Technologies**
✅ Argon2 installé et configuré - 11/01/2026  
✅ jsonwebtoken installé et configuré - 11/01/2026  
✅ env configuré avec JWT_SECRET - 11/01/2026  

### **Backend - Fonctions datamapper**
✅ `createUser(email, password, role, firstName, lastName)` - 11/01/2026  
✅ `getUserByEmail(email)` - 11/01/2026  

### **Backend - Contrôleurs d'authentification**
✅ `register` : Inscription utilisateur avec hash Argon2 - 11/01/2026  
✅ `login` : Connexion avec vérification password et génération JWT - 11/01/2026  
✅ `getMe` : Récupération des infos utilisateur connecté - 11/01/2026  

### **Backend - Middlewares**
✅ `authenticateToken` : Vérification du token JWT - 11/01/2026  

### **Backend - Routes API**
✅ POST `/api/auth/register` : Inscription - 11/01/2026  
✅ POST `/api/auth/login` : Connexion - 11/01/2026  
✅ GET `/api/auth/me` : Infos utilisateur (protégée) - 11/01/2026  

### **Backend - Routes HTML**
✅ GET `/register` : Affiche formulaire d'inscription - 11/01/2026  
✅ GET `/login` : Affiche formulaire de connexion - 11/01/2026  

### **Frontend - Vues EJS**
✅ `register.ejs` : Formulaire d'inscription (email, password, firstName, lastName) - 11/01/2026  
✅ `login.ejs` : Formulaire de connexion - 11/01/2026  
✅ Modification de `index.ejs` avec le script getMe - 11/01/2026  

### **Frontend - Scripts JavaScript**
✅ `auth_register.script.js` : Gestion inscription avec fetch() - 11/01/2026  
✅ `auth_login.script.js` : Gestion connexion avec fetch() et stockage token - 11/01/2026  
✅ `getMe.script.js` : Vérification token et affichage "Bienvenue [Prénom Nom]" - 11/01/2026  

### **Frontend - localStorage**
✅ Stockage du token JWT après connexion - 11/01/2026  
✅ Récupération du token pour les requêtes protégées - 11/01/2026  
✅ Suppression du token si expiré/invalide - 11/01/2026  

### **Tests**
✅ Test inscription avec RapidAPI - 11/01/2026  
✅ Test connexion avec RapidAPI - 11/01/2026  
✅ Test route protégée `/api/auth/me` avec RapidAPI - 11/01/2026  
✅ Test affichage "Bienvenue [nom]" sur page d'accueil - 11/01/2026  

---

## 📚 DOCUMENTATION CRÉÉE

✅ Fiche pratique Argon2 & JWT - 11/01/2026  
✅ Fiche pratique Fetch & Frontend/Backend - 11/01/2026  

---

## 🎯 CE QU'IL RESTE À FAIRE

### **Phase 3 : Middleware de rôle**
- ⚪ Créer `requireRole(role)` middleware
- ⚪ Protéger les routes selon les rôles (admin, hero, user)

### **Amélioration de l'authentification**
- ⚪ Bouton "Déconnexion" (supprimer token du localStorage)
- ⚪ Modifier le header : afficher "Se connecter" si non connecté, "Mon compte" si connecté
- ⚪ Page "Mon profil" pour modifier ses informations

### **Fonctionnalités héros**
- ⚪ Dashboard héros avec liste des missions disponibles
- ⚪ Route `/api/missions/available` : Voir missions disponibles
- ⚪ Route POST `/api/missions/:id/take` : Prendre une mission
- ⚪ Route GET `/api/missions/mine` : Historique des missions du héros
- ⚪ Interface pour consulter et prendre des missions

### **Fonctionnalités admin**
- ⚪ Route POST `/api/heroes` : Créer un héros (+ compte user associé)
- ⚪ Route PUT `/api/heroes/:id` : Modifier un héros
- ⚪ Route DELETE `/api/heroes/:id` : Supprimer un héros
- ⚪ Interface d'administration

### **Fonctionnalités missions**
- ⚪ Calculer le pourcentage de réussite du héros (`nb_success / nb_mission`)
- ⚪ Page listant toutes les missions
- ⚪ Filtrer les missions par statut (Disponible, En cours, Terminée)
- ⚪ Permettre au client de choisir un héros pour sa mission

### **Amélioration UX générale**
- ⚪ CSS / Design
- ⚪ Messages d'erreur plus explicites
- ⚪ Validation des formulaires côté client (avant envoi)
- ⚪ Loader / Spinner pendant les requêtes
- ⚪ Toast notifications au lieu des `alert()`

---

**mise à jour** 17/01/2026

## ✅ Système de création de héros avec compte utilisateur

**Objectif** : Les héros créés par l'admin ont automatiquement un compte `users` pour se connecter et remplir leurs rapports de mission.

### **Architecture BDD**
- ✅ Table `users` créée en premier avec contrainte sur les rôles (admin, hero, user)
- ✅ Table `hero` modifiée : ajout de `id_user` (compte du héro) et `created_by` (admin créateur)
- ✅ Migration des données existantes vers la nouvelle structure

### **Création de héros améliorée**
- ✅ Formulaire de création étendu (email, password, firstName, lastName)
- ✅ Création simultanée du compte `users` (role='hero') et de l'entrée dans la bdd de `hero`
- ✅ Liaison automatique via `hero.id_user`

### **Middlewares et routes protégées**
- ✅ Middleware `isHero` créé
- ✅ Routes rapport de mission protégées par `authenticateToken` + `isHero` pour que seul le héro y accède
- ✅ Routes création héros protégées par `authenticateToken` + `isAdmin` pour que seul l'admin y accède


**mise à jour** 18/01/2026
- Améliorer l'expérience utilisateur avec le système d'authentification : header dynamique, déconnexion, et affichage conditionnel des liens selon le rôle.

### **Fonctionnalités implémentées**
- ✅ Script `header.script.js` pour gérer l'affichage dynamique du header
- ✅ Affichage "Bienvenue [Prénom Nom]" pour utilisateurs connectés
- ✅ Bouton déconnexion fonctionnel (suppression token + redirection)
- ✅ Affichage conditionnel des liens selon le rôle :
  - Admin : voit "Créer un héro" (pas "Rapport de mission")
  - Hero : voit "Rapport de mission" (pas "Créer un héro")
  - Non connecté : voit "Connexion" et "Inscription"
- ✅ Formatage automatique des noms (première lettre en majuscule)

### ** EXERCICE : Dashboard Héros **
But final
Créer une interface pour les héros connectés qui leur permet de :

Voir les missions disponibles (status = 'Disponible')
Prendre une mission (passe le status à 'En cours' + assigne le héros)
Voir leur historique (missions terminées avec leurs stats)

todo : 

Sur le dashboard je vais afficher les missions disponibles pour le héro.
Je vais récupérer l'id_user du héro avec req.user.userId, puis utiliser une fonction datamapper pour récupérer son id_hero.
Je crée une route GET pour afficher la page du dashboard avec les missions où status = 'Disponible'.
Sur le dashboard il y aura les missions affichées avec un bouton "Choisir" pour chaque mission.
J'ai une route GET API qui récupère les missions disponibles en JSON pour le frontend.
J'ai une route PATCH pour prendre une mission : elle va modifier 2 colonnes dans la BDD (id_hero et status).
Dans le datamapper je prépare 3 fonctions :

getAvailableMissions() pour récupérer les missions disponibles
Une fonction pour récupérer l'id_hero depuis l'id_user
Une fonction pour assigner le héro (UPDATE sur id_hero et status)

Dans le controller j'ai updateStatusMission(req, res) qui récupère l'id_user, appelle le datamapper pour avoir l'id_hero, puis fait l'UPDATE sur la mission.
Côté frontend : un script qui fetch les missions au chargement, les affiche, et quand on clique sur "Choisir", envoie une requête PATCH au backend puis recharge la liste.