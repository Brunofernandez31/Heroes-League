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

**Dernière mise à jour :** 11/01/2026