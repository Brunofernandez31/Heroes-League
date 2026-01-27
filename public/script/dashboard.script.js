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
                <p><span class="wordBold">Mise en ligne le :</span> ${formattedDate}</p>
                <p class="description_mission"><span class="wordBold">Description :</span> ${descriptionFormatted}</p>
                <p><span class="wordBold">Ville :</span> ${cityMission}</p>
                <p><span class="wordBold">Urgence :</span> ${urgencyMission}</p>
                <p><span class="wordBold">Statut :</span> ${statusMission}</p>
            </div>
                <div>
                <button type="submit" class="button_choose_mission">Choisir cette mission</button>
                <button type="submit" class="button_annuler_mission">Annuler le choix</button>
                <button type="submit" class="button_finish_mission" data-finishmission="${idMission}">Terminer la mission ?</button>
                <a href="/" class="button_link">Retour à l'accueil</a>
                </div>
            </article>
            `;

            const section = document.getElementById("section_dashboard");
            section.innerHTML = section.innerHTML + articleHtml;

        });

        const chooseMission = document.querySelectorAll(".button_choose_mission");// Sélectionner tous les boutons dupliqués

        chooseMission.forEach(button => { // Boucler pour mettre un listener sur chacun des boutons
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.textContent = "Mission choisie"; // Remplacer totalement le texte existant du boutton

                // On doit récupérer le parent du bouton pour les afficher dynamiquement
                const buttonParent = button.parentElement;
                const buttonAnnuler = buttonParent.querySelector(".button_annuler_mission");
                const buttonTerminer = buttonParent.querySelector(".button_finish_mission");
                
                buttonAnnuler.style.display = "block"; // Afficher le bouton "Annuler le choix"
                buttonTerminer.style.display = "block"; // Afficher le bouton "Terminer la mission"

                buttonAnnuler.addEventListener('click', (e) => {
                e.preventDefault();
                    buttonAnnuler.style.display = "none"; // Cacher le bouton "Annuler le choix"
                    buttonTerminer.style.display = "none"; // Cacher le bouton "Terminer la mission"
                    button.textContent = "Choisir cette mission"; // Remettre le texte d'origine
                });

                buttonTerminer.addEventListener('click', (e) => {
                e.preventDefault();
    console.log("🔍 Dataset complet:", buttonTerminer.dataset);
    console.log("🔍 finishMission:", buttonTerminer.dataset.finishmission)
                    const buttonIdMission = Number(buttonTerminer.dataset.finishmission);
                    window.location.href = `/rapport_mission/${buttonIdMission}`;
                })
            })
        });

    } else {
        const error = await response.json();
        alert("Erreur : " + error.error);
    }
}

getMission();