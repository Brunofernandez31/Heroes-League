# Un dockerfile est une "recette amélioré" d'une image de base (FROM) permettant de créer des conteneurs pré-configuré plus finement

# Définir l'image de base depuis laquelle on créé notre image
FROM node:22-alpine

# Définir un espace de travail
# /app est très commun (convention) pour les applications Node
WORKDIR /app

# On copie le package.json dans le futur conteneur
COPY package*.json ./

# On installe les dépendances de Node
# RUN = commande que l'on lance à la construction de l'IMAGE
RUN npm install 

# Copier le reste du code
# On copie tout le code du dossier courant (local) dans le dossier courant du conteneur
# On le fait en deux fois la copie pour la mise en cache des étapes précédentes par Docker
COPY ./ ./

# Gérer les variables d'environnement
# On ne veut PAS copier le .env local dans l'image, car on ne sait pas encore sur quel environnement on va créer un conteneur (local, pre-prod, prod, test)
# On va ignorer le .env de la commande COPY ---> .dockerignore

CMD ["npm", "run", "dev"]

