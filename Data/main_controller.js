import { name } from "ejs";
import datamapper from "./main_datamapper.js"



// afficher tous les héros pour la vue nos-heros

export async function displayHeroes(_req, res) {

  const result = await datamapper.getHeroes();
    
  res.render("nos_heros", {
    heroes: result
  });
};



// afficher le formulaire de demande de mission du client

export function displaySauvezMoiForm(_req, res) {
  res.render('sauvez_moi');
};



// afficher tous les héros pour la vue rapport de fin de mission du héro

export async function displayRapportMission(req, res) {

  //Récupérer l'id depuis le parametre dans l'URL
  const idUrl = req.params.id

  const result = await datamapper.getHeroes();
  const mission = await datamapper.getMissionById(idUrl); //Utiliser l'id récupérer depuis l'URL
    
  res.render("rapport_mission", {
    heroes: result,
    mission
  });
};



// afficher un héro

export async function displayHeroesById (req, res) {

  const heroId = req.params.id;

  const result = await datamapper.getHeroesById(heroId); //Recupère le héro avec son id
  const resultTestimonies = await datamapper.getTestimonyById(heroId); // Recupère le témoignage lié à l'id du héro

  if (!result) {
    res.send("Le héro n'a pas été trouvé");
    return // Toujours pour arrêter l'exécution
  }

    if (!resultTestimonies) {
    res.send("Le témoignage n'a pas été trouvé");
    return // Toujours pour arrêter l'exécution
  }

  res.render("votre_hero", {
    hero : result, // Données envoyées à la vue
    testimony : resultTestimonies
  });
};

ok maintenant passons à tout autre chose

l'authentification

je veux qu'il y ait un bouton connexion et un bouton inscription

l'inscription sera pour les clients 

la connexion sera pour les héros 



// Afficher les témoignages clients

export async function displayTestimonies(_req, res) {

  const result = await datamapper.getTestimonies();
    
  res.render("testimonies", {
    testimonies: result
  });
};



// Trouver les infos du formulaire client et insérer la mission dans la BDD

export async function findClient (req, res) {

  // Récupérer toutes les données du formulaire de demande client
  const clientName = req.body.user_name;
  const clientMail = req.body.user_mail;
  const clientCity = req.body.user_city;
  const clientDescription = req.body.user_message;
  const clientUrgency = req.body.choice_urgence;

  
  if (!clientMail || !clientName || !clientCity || !clientDescription) {
    res.send("Champs obligatoires")
    return
  }
  
  //Chercher si le client dans la bdd
  const existingClient = await datamapper.getClientByMail(clientMail);

  let clientId; // Attention au scope vu qu'on en a besoin dans les deux cas de l'ID, il faut le déclarer undefined avant

  if (existingClient) {
    // Le client existe déjà
    clientId = existingClient.id_client; // Assignation de l'id client

  } else {
    // Le client n'existe pas, on va le créer
    const newClient = await datamapper.createClientBdd (clientName, clientMail);
    clientId = newClient.id_client; // Assignation de l'id client
  }

  // Création de la mission
  const missionCreate = await datamapper.createMission (clientDescription, clientCity, clientId, clientUrgency)
  if(missionCreate) {
    res.redirect("/"); // si on utilise render c'est une erreur
    // Ici on utilise redirect pour renvoyer vers une page et pas rendre une vue 
  }
};



// Fonction permettant de prévisualiser le rapport envoie envoie. Dans le but d'afficher le prix total

export async function previewRapport (req, res) {
  //Récupérer l'id de la mission, comme on est en back on utilise les req.params
  const missionId = req.params.id;
  
  // Récupérer la mission en cours via datamapper et lui assigné l'id de la mission
  const mission = await datamapper.getMissionById(missionId);
  
  
  // console.log(missionId) // Voir si on récupère bien l'id dans l'URL
  // console.log(req.body) // Que récupère le body ? Utile pour savoir quoi pointer sur l'objet req.body
  
  // Récupérer toutes les données du formulaire de rapport de mission du héro
  const idHero = req.body.heroId; // Id héro
  const urgency = mission.urgency; // Degre urgence non changeable par le héro donc pas de récupération via req.body.urgency mais plutot par la bdd
  const duration = req.body.duration; // Temps mission
  const comments = req.body.comments; // Commentaire de mission
  const missionResult = req.body.missionResult; // Sucess ou failed


  // Calculer de manière sécurisée le prix total à mettre à jour

  // console.log(idHero)
  const hero = await datamapper.getHeroesById(idHero); // Bien envoyé l'id du 
  const nameHero = hero.name; // Viser la colonne de la bdd contenant le nom du héro
  const heroPrice = hero.price_per_hour; // Viser la colonne de la bdd contenant le taux horaire du héro

  let totalPrice = 0;

  if(urgency === "hebdomadaire") {
    totalPrice = heroPrice * duration * ( 1 + 0);
  } else if(urgency === "threeDays") {
    totalPrice = heroPrice * duration * ( 1 + 0.05);
  } else if(urgency === "immediate") {
    totalPrice = heroPrice * duration * ( 1 + 0.15);
  }
  
  // console.log("=== DONNÉES DISPONIBLES ===");
  // console.log("Total calculé:", totalPrice);
  // console.log("Mission:", mission);
  // console.log("Héros:", hero);
  // console.log("Urgence:", urgency);
  // console.log("Durée:", duration);
  // console.log("Résultat:", missionResult);
  // console.log("Commentaires:", comments);

  // Renvoyer une réponse en json pour que le front puisse le comprendre

  res.json({
    nameHero,
    heroPrice,
    duration,
    urgency,
    comments,
    totalPrice,
    missionResult
  })
// Plus rien ne s'éxécute après, la res est envoyée
};



// Trouver les infos du formulaire du rapport de mission du héro
// modifier la mission dans la BDD avec UPDATE + total de mission du héro incrémenté + taux reussite héro(à terminer)

export async function sendRapportMission (req, res) {

  //Récupérer l'id de la mission
  const missionId = req.params.id;
  // Récupérer la mission en cours grâce à l'Id
  const mission = await datamapper.getMissionById(missionId);

  // console.log(missionId) // Voir si on récupère bien l'id dans l'URL
  console.log(req.body) // Que récupère le body ?

  // Récupérer toutes les données du formulaire de rapport de mission du héro
  const idHero = req.body.hero_id; // Id héro
  const urgency = mission.urgency; // Degre urgence non changeable par le héro donc pas de récupération via req.body.urgency mais plutot par la bdd
  const missionDuration = req.body.mission_duration; // Temps mission
  const missionComments = req.body.mission_comments; // Commentaire de mission
  const missionResult = req.body.mission; // Sucess ou failed


  // Calculer de manière sécurisée le prix total à mettre à jour

  const hero = await datamapper.getHeroesById(idHero); // Bien envoyé l'id du héro
  const heroPrice = hero.price_per_hour; // Viser la colonne de la bdd contenant le taux horaire du héro

  let totalPrice = 0;

  if(urgency === "hebdomadaire") {
    totalPrice = heroPrice * missionDuration * ( 1 + 0);
  } else if(urgency === "threeDays") {
    totalPrice = heroPrice * missionDuration * ( 1 + 0.05);
  } else if(urgency === "immediate") {
    totalPrice = heroPrice * missionDuration * ( 1 + 0.15);
  }

  // Appel de la fonction
  await datamapper.updateMission(missionId, idHero, missionDuration, missionComments, totalPrice, missionResult);
  await datamapper.updateHero(idHero);

  res.redirect("/"); // si on utilise render c'est une erreur
  // Ici on utilise redirect pour renvoyer vers une page et pas rendre une vue 
};