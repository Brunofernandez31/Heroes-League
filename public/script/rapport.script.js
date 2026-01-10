// Récupérer tous les éléments dont on a besoin

const hero = document.getElementById("hero_select");
const duration = document.getElementById("mission_duration");
const tauxHoraire = document.getElementById("hourly_rate");
const total = document.getElementById("total_price");
const supplement = document.getElementById("")


// 'change' permet d'écouter l'evenement quand l'utilisateur change de héro
hero.addEventListener('change', () => {
    const optionSelectionnee = hero.options[hero.selectedIndex];
    const prix = optionSelectionnee.dataset.price
    tauxHoraire.value = prix // Afficher la value dans l'input text du taux horaire du héro
});



// Affichage de la modal du rapport de mission

const previewRapport = document.getElementById("preview_rapport"); // Récupérer le bouton d'affichage de la modal

previewRapport.addEventListener("click", async () => { // Déclencher un évènement au clic

    // Récupérer les éléments du formulaire qu'on voudra afficher sur la modal
    // Comme on communique avec le front on utilise les id du DOM
    const idHero = document.getElementById("hero_select").value;
    const missionId = document.getElementById("mission_id").value; // Id de la mission récupéré facilement grâce à l'input hidden en backEnd
    // Pas obligé de récupérer le taux horaire car en back on peut faire une requete vers la bdd pour le récupérer

    // Condition pour retravailler le texte d'affichage dans le dom
    const urgency = document.getElementById("urgency").value;
    let urgencyText;
        if (urgency === "hebdomadaire") {
            urgencyText = "en : 7 jours"
        } else if (urgency === "threeDays") {
            urgencyText = "en 3 jours"
        } else {
            urgencyText = "immédiatement"
        }
    const duration = document.getElementById("mission_duration").value;
    
    //Convertir le 0.5 minutes en 30 minutes
        let durationValue;
    if (duration < 1) {
        durationValue = duration * 60 + "minutes"
    } else if (duration % 1 === 0) {
        durationValue = duration + " heures"
    } else {
    // Nombre décimal (1.5, 2.5...) → Afficher heures + minutes
    const heures = Math.floor(duration); // On enlève la partie décimal avec math.floor qui arrondi au plus bas
    const minutes = (duration % 1) * 60;  // On récupère le reste de la division par 1 (donc la partie décimale) qu'on multiplie par 60
    durationValue = heures + "h" + minutes;
    }


    const missionResult = document.querySelector('input[name="mission"]:checked')?.value; // Retourne "success" OU "failed" (celui qui est coché)
    // on va sélectionner tous les input appelé "name"
    // Les : c'est pour vérifier s'ils sont cochés
    // Le ?. C'est une sécurité, si aucun est coché on renvoi undefined
    // Value c'est la valeur (success ou failed)
    let missionResultValue;
        if (missionResult === "success") {
            missionResultValue = "succès"
        } else {
            missionResultValue = "échec"
        }

    const comments = document.getElementById("mission_comments").value; // Récupérer la valeur des commentaires

    // 1) Envoyer la requete du front end vers le serveur 

        // Envoyer un requete AJAX au serveur (sans rechargement de page)
    const response = await fetch (`/rapport_mission/${missionId}/preview`, { // Lui dire d'aller sur cette page. Ca va déclencher la route et le controlleur qui lui est associé
    // Création de son objet
    method: "POST", // La méthode qu'on va envoyer, son type de requête
    headers: { "content-Type": "application/json" }, // Indique qu'on va envoyer du json
    // Le Body c'est le corps de ma requête, on va mettre ce que je veux envoyer dans le backend pour le main_controller
    body: JSON.stringify ({ // On utilise stringify pour convertir l'objet javascript en chaine de caractères json (pour que le serveur comprenne)
        // On créer un objet
        heroId : idHero, // On a besoin de l'id pour l'URL
        // On peut continuer en allant plus vite en faisant une contraction vu qu'on a la même paire clé/valeur
        // Attention, il faudra faire attention à bien récupérer la clé dans le backEnd
        missionId, // l'id de la mission
        urgency,
        duration, // Laissé la valeur brut ici de la durée (ex : 1.5) pour le calcul dans le backend
        missionResult, // Success ou failed
        comments
    })
}); // Fermer FETCH pour ensuite recevoir/récupérer la réponse

// 2) Traduire la réponse reçu/récupérer du serveur du format de chaine de caracteres JSON en format d'objet JS
const data = await response.json(); // Convertit la chaîne JSON reçun en objet JavaScript afin de pouvoir ecrire dans le DOM

document.getElementById("modal_hero").textContent = data.nameHero; // Ecrire dans le DOM de la modal
document.getElementById("modal_taux").textContent = data.heroPrice;
document.getElementById("modal_duration").textContent = durationValue; // Bien envoyé durationValue ici car on envoie le formatage de l'heure
// Note : pas besoin de data.durationValue parce que durationValue c'est une variable direct locale du frontend
document.getElementById("modal_urgency").textContent = urgencyText;
document.getElementById("modal_comments").textContent = data.comments;
document.getElementById("modal_total").textContent = data.totalPrice;
document.getElementById("modal_result").textContent = missionResultValue;

// Afficher la modal en changeant son style de none en block
document.getElementById("preview_modal").style.display = "block";

// Fermer la modal en appuyant sur le bouton annuler
const closeModal = document.getElementById("close_modal");
closeModal.addEventListener("click" , () => {
    document.getElementById("preview_modal").style.display = "none";
})

})