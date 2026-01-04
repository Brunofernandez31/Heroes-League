import datamapper from "./main_datamapper.js"



// afficher tous les héros pour la vue nos-heros

export async function displayHeroes(_req, res) {

  const result = await datamapper.getHeroes();
    
  res.render("nos_heros", {
    heroes: result
  });
}



// afficher le formulaire de demande de mission du client

export function displaySauvezMoiForm(_req, res) {
  res.render('sauvez_moi');
}



// afficher tous les héros pour la vue rapport de fin de mission du héro

export async function displayRapportMission(_req, res) {

  const result = await datamapper.getHeroes();
    
  res.render("rapport_mission", {
    heroes: result
  });
}



// afficher un héro

export async function displayHeroesById (req, res) {

  const heroId = req.params.id;

  const result = await datamapper.getHeroesById(heroId); //Recupère le héro avec son id
  const resultTestimonies = await datamapper.getTestimonyById(heroId); // Recupère le témoignage lié à l'id du héro

  if (!result) {
    res.render("Le héro n'a pas été trouvé");
    return // Toujours pour arrêter l'exécution
  }

    if (!resultTestimonies) {
    res.render("Le témoignage n'a pas été trouvé");
    return // Toujours pour arrêter l'exécution
  }

  res.render("votre_hero", {
    hero : result, // Données envoyées à la vue
    testimony : resultTestimonies
  });
}



// Afficher les témoignages clients

export async function displayTestimonies(_req, res) {

  const result = await datamapper.getTestimonies();
    
  res.render("testimonies", {
    testimonies: result
  });
}



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
    res.send ("La mission a été créér avec succès")
  }
}



// Trouver les infos du formulaire de rapport de mission du héro
// modifier la mission dans la BDD + taux reussite héro

export async function sendRapportMission (req, res) {
  console.log(req.body)
  // Récupérer toutes les données du formulaire de rapport de mission du héro
  const idHero = req.body.hero_id; //Id héro
  const urgency = req.body.urgency; // Degre urgence
  const missionDuration = req.body.mission_duration; // Temps mission
  const missionResult = req.body.mission; //Sucess ou echec
  const missionComments = req.body.mission_comments; // Commentaire de mission

  // const result = await datamapper.updateMission();
}