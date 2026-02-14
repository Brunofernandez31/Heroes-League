// Récupérer tous les éléments dont on a besoin

// Affichage de la modal du rapport de mission
const previewRapport = document.getElementById("preview_rapport"); // Récupérer le bouton d'affichage de la modal

previewRapport.addEventListener("click", async () => { // Déclencher un évènement au clic

    //Condition pour convertir le 0.5 minutes en 30 minutes
    const duration = document.getElementById("mission_duration").value;

    let durationValue;

    if (duration < 1) {
        durationValue = duration * 60 + "mintues"
    } else if (duration % 1 === 0) {
        durationValue = `${duration}h`
    } else {
        // Nombre décimal (1.5, 2.5...) → Afficher heures + minutes
        const heures = Math.floor(duration); // On enlève la partie décimal avec math.floor qui arrondi au plus bas
        const minutes = (duration % 1) * 60;  // On récupère le reste de la division par 1 (donc la partie décimale) qu'on multiplie par 60
        durationValue = `${heures}h${minutes}`;
    }


    const missionResult = document.querySelector('input[name="mission"]:checked')?.value; // Retourne "success" OU "failed" (celui qui est coché)
    // on va sélectionner tous les input appelé "name"
    // Les : c'est pour vérifier s'ils sont cochés
    // Le ?. C'est une sécurité, si aucun est coché on renvoi undefined
    // value c'est la valeur (success ou failed)
    let missionResultValue;
    if (missionResult === "success") {
        missionResultValue = "succès"
    } else {
        missionResultValue = "échec"
    }

    const urgency = document.getElementById("urgency").value;
    let urgencyText;
    if (urgency === "hebdomadaire") {
        urgencyText = "Hebdomadaire"
    } else if (urgency === "threeDays") {
        urgencyText = "3 jours"
    } else {
        urgencyText = "Immédiat"
    }

    let penality = null;
    if (urgency === "hebdomadaire") {
        penality = 0
    } else if (urgency === "threeDays") {
        penality = 5
    } else {
        penality = 15
    }

    const idHero = document.getElementById("hero_id").value;
    const missionId = document.getElementById("mission_id").value; // Id de la mission récupéré facilement grâce à l'input hidden en backEnd
    const comments = document.getElementById("mission_comments").value; // Récupérer la valeur des commentaires

    // Envoyer un requete AJAX au serveur (sans rechargement de page)
    const response = await fetch(`/rapport_mission/${missionId}/preview`, {
        method: "POST",
        headers: { "content-Type": "application/json" }, // Indique qu'on va envoyer du json
        // Le Body c'est le corps de ma requête, on va mettre ce que je veux envoyer dans le backend pour le main_controller
        body: JSON.stringify({ // On utilise stringify pour convertir l'objet javascript en chaine de caractères json (pour que le serveur comprenne)
            // On créer un objet
            heroId: idHero, // On a besoin de l'id pour l'URL
            missionId, // l'id de la mission
            duration, // Laissé la valeur brut ici de la durée (ex : 1.5) pour le calcul dans le backend
            missionResult, // Success ou failed
            comments
        })
    }); // Fermer FETCH pour ensuite recevoir/récupérer la réponse

    // 2) Traduire la réponse reçu/récupérer du serveur du format de chaine de caracteres JSON en format d'objet JS
    const data = await response.json(); // Convertit la chaîne JSON reçun en objet JavaScript afin de pouvoir ecrire dans le DOM

    document.getElementById("modal_duration").textContent = durationValue; // Bien envoyé durationValue ici car on envoie le formatage de l'heure
    document.getElementById("modal_urgency").textContent = urgencyText;
    document.getElementById("modal_penality").textContent = penality;
    document.getElementById("modal_comments").textContent = comments;
    document.getElementById("modal_total").textContent = data.totalPrice.toFixed(2);
    document.getElementById("modal_result").textContent = missionResultValue;

    // Afficher la modal en changeant son style de none en block
    document.getElementById("preview_modal").style.display = "block";

    // Fermer la modal en appuyant sur le bouton annuler
    const closeModal = document.getElementById("close_modal");
    closeModal.addEventListener("click", () => {
        document.getElementById("preview_modal").style.display = "none";
    })
})


// Envoyer le rapport à la bdd
const sendRapport = document.getElementById("send_rapport");

sendRapport.addEventListener('click', async (e) => {
    e.preventDefault();
    const missionId = document.getElementById("mission_id").value;
    const idHero = document.getElementById("hero_id").value;
    const duration = document.getElementById("mission_duration").value;
    const comments = document.getElementById("mission_comments").value;
    const missionResult = document.querySelector('input[name="mission"]:checked')?.value; // Retourne "success" OU "failed" (celui qui est coché)

    const id = document.getElementById("mission_id").value;
    const token = localStorage.getItem('token');

    const response = await fetch(`/rapport_mission/${id}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            missionId,
            idHero,
            duration,
            comments,
            missionResult
        })
    })

    const result = await response.json();
    if (result.ok) {
        window.location.href ="/dashboard";
    }
})