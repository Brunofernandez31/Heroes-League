import datamapper from "./main_datamapper.js"

// afficher tous les héros

export async function displayHeroes(_req, res) {

  const result = await datamapper.getHeroes();
    
  res.render("nos-heros", {
    heroes: result
  });
}

// afficher un héro

export async function displayHeroesById (req, res) {

  const heroId = req.params.id;

  const result = await datamapper.getHeroesById(heroId); //Recupère le héro avec son id
  const resultTestimonies = await datamapper.getTestimonyById(heroId); // Recupère le témoignage lié à l'id du héro

  if (!result){
    res.render("Le héro n'a pas été trouvé");
    return // Toujours pour arrêter l'exécution
  }

    if (!resultTestimonies){
    res.render("Le témoignage n'a pas été trouvé");
    return // Toujours pour arrêter l'exécution
  }

  res.render("votre-hero", {
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

// Trouver le client insérer dans la BDD

export async function findClient (req,res) {

  const clientName = req.body.user_name;
  const clientMail = req.body.user_mail;
  const clientCity = req.body.user_city;
  const clientDescription = req.body.user_message;
  const clientUrgency = req.body.choice_urgence;

  
  if (!clientMail || !clientName) {
    res.send("Champs obligatoires")
    return
  }
  
  //Chercher si le client existe
  const existingClient = await datamapper.getClientByMail(clientMail);
console.log("Client trouvé:", existingClient);
  let clientId;

  if (existingClient) {
    // Le client existe
    const clientId = existingClient.id_client;

  } else {

    // Le client n'existe pas, le créer
    const newClient = await datamapper.createClientBdd(clientName, clientEmail);
    const newClientId = newClient.id_client;
  }


}