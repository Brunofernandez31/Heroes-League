// Récupérer tous les éléments dont on a besoin

const hero = document.getElementById("hero_select");
const duration = document.getElementById("mission_duration");
const tauxHoraire = document.getElementById("hourly_rate");
const total = document.getElementById("total_price");
const supplement = document.getElementById("")


// function totalPrice () {
//     const prixHero = tauxHoraire.value;
//     const duree = duration.value;

//     // Calcul du prix total et le convertir en nombre pour la bdd avec Number
//     const totalPrice = Number((prixHero * duree * ( 1+ supplement)).toFixed(2)); // Réduire 2 chiffres apres la virgule
//     // On met 1 pour le pourcentage
//     // Si on met pas le 1 alors Résultat : 50 × 2 × 0.05 = 5€
//     // Correction : Résultat : 50 × 2 × (1 + 0.05) = 105€
//     total.value = totalPrice // Envoyé à l'input type texte la value pour le prix total
// };


// // Il faut mettre un ecouteur d'evenement à chaque fois qu'on peut changer un element influençant le prix
// // Et appeler la fonction pour le prix total

// duration.addEventListener('change', () => {
//     totalPrice()
// });


// 'change' permet d'écouter l'evenement quand l'utilisateur change de héro
hero.addEventListener('change', () => {
    const optionSelectionnee = hero.options[hero.selectedIndex];
    const prix = optionSelectionnee.dataset.price
    tauxHoraire.value = prix // Afficher la value dans l'input text du taux horaire du héro

    // Appelle de la fonction pour afficher le prix total
    // totalPrice()
});



// Affichage de la modal du rapport de mission

// Récupérer le bouton d'affichage de la modal
const previewRapport = document.getElementById("preview_rapport");

previewRapport.addEventListener("click", async () => { // Déclencher un évènement au clic

    // Récupérer les éléments du formulaire qu'on voudra afficher sur la modal
    // Comme on communique avec le front on utilise les id du DOM
    const idHero = document.getElementById("hero_select").value;
    const missionId = document.getElementById("mission_id").value; // Id de la mission récupéré facilement grâce à l'input hidden en backEnd
    // const tauxHoraire = document.getElementById("hourly_rate").value; // Pas obligé car en back on peut faire une req vers la bdd pour le récupérer
    const urgency = document.getElementById("urgency").value;
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

    const comments = document.getElementById("mission_comments").value;

    // 1) Envoyer la requete du front end vers le serveur 

    const response = await fetch (`/rapport_mission/${missionId}/preview`, { // Lui dire d'aller sur cette page. Ca va déclencher la route et le controlleur qui lui est associé
    // Création de son objet
    method: "POST", // La méthode qu'on va envoyer
    headers: { "content-Type": "application/json" }, // 
    // Le corps de ma requête, mettre ce que je veux envoyer dans le backend
    body: JSON.stringify ({ // On utilise stringify pour convertir en json en format d'objet lisible pour que javascript comprenne
        // On créer un objet
        heroId : idHero, // On a besoin de l'id pour l'URL
        // On peut continuer en allant plus vite en faisant une contraction vu qu'on a la même paire clé/valeur
        // Attention, il faudra faire attention à bien récupérer la clé dans le backEnd
        missionId, // l'id de la mission
        urgency,
        duration,
        missionResult,
        comments
    }),
}) // Fermer FETCH pour ensuite recevoir/récupérer la réponse

// 2) Traduire la réponse reçu/récupérer du backEnd qui est en json en format d'objet lisible pour que javascript comprenne
// Afin de s'en servir pour écrire dans la modal dans le DOM
const data = await response.json();

document.getElementById("modal_hero").textContent = data.nameHero; // Ecrire dans le DOM de la modal
document.getElementById("modal_taux").textContent = data.heroPrice;
document.getElementById("modal_duration").textContent = data.durationValue;

document.getElementById("modal_urgency").textContent = data.urgency;
document.getElementById("modal_comments").textContent = data.comments;
document.getElementById("modal_total").textContent = data.totalPrice;
document.getElementById("modal_result").textContent = data.missionResult;

// Afficher la modal en changeant son style de none en block
document.getElementById("preview_modal").style.display = "block";

})
