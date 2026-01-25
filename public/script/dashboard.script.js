const token = localStorage.getItem('token');

async function getMission() {
    const response = await fetch('/api/dashboard', {
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-Type": "application/json"
        }
    })
    
    const data = await response.json(); // La réponse du back contenant les informations pioché en bdd
    console.log(data.getmission) // On vise getmission car sur la fonction du controller on fait res.json({getmission})
    
    if (response.ok) {
        
        const dataMission = data.getmission; // data.getmission est un tableau d'objet
        // Afin d'afficher toutes les missions on va boucler dessus
        dataMission.forEach(mission => { // mission contiendra qu'un seul element du tableau d'objet de data.getmission
            
            const idMission = mission.id_mission;
            const descriptionMission = mission.description;
            const descriptionFormatted = descriptionMission.replace(/([.!?;]) /g, "$1\n"); // Formater en retour à la ligne suivi quelques ponctuations
            const cityMission = mission.city;
            const startMission = mission.start_date;
            const formattedDate = new Date(startMission).toLocaleDateString('fr-FR') // Formater les dates en version fr
            const clientMission = mission.client_name;
            const statusMission = mission.status;
            const urgencyMission = mission.urgency;
            
            const articleHtml = 
            `
            <article class="article_mission">
            <p class="title_mission"><span class="wordBold">Mission n°:</span> ${idMission}</p>
            <div class="article_mission_rangement">
                <p><span class="wordBold">Nom du client : </span> ${clientMission}</p>
                <p><span class="wordBold">Commence le :</span> ${formattedDate}</p>
                <p class="description_mission"><span class="wordBold">Description :</span> ${descriptionFormatted}</p>
                <p><span class="wordBold">Ville :</span> ${cityMission}</p>
                <p><span class="wordBold">Urgence :</span> ${urgencyMission}</p>
                <p><span class="wordBold">Statut :</span> ${statusMission}</p>
            </div>
                <div>
                <button type="submit">Choisir cette mission</button>
                <a href="/" class="button_link">Retour à l'accueil</a>
                </div>
            </article>
            `;

            const section = document.getElementById("section_dashboard");
            section.innerHTML = section.innerHTML+articleHtml;

        });
    } else {
        const error = await response.json();
        alert("Erreur : " + error.error);
    }
}

getMission();