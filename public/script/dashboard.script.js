const token = localStorage.getItem('token');

// Créer une notification toast

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

async function getMission() {
    const loader = document.getElementById("loader");
    loader.classList.add("loader"); // pour afficher un petit logo de chargement 

    const response = await fetch('/api/dashboard', {
        headers: {
            "Authorization": `Bearer ${token}`,
            "content-Type": "application/json"
        }
    })

    const data = await response.json(); // La réponse du back contenant les informations pioché en bdd
    // console.log(data.getmission) // On vise getmission car sur la fonction du controller on fait res.json({getmission})
    if (response.ok) {

        const dataMission = data.getmission; // data.getmission est un tableau d'objet
        // Afin d'afficher toutes les missions on va boucler dessus
        dataMission.forEach(mission => { // mission contiendra qu'un seul element du tableau d'objet de data.getmission

            const idMission = mission.id_mission;
            const idHero = mission.id_hero;
            const descriptionMission = mission.description;
            const descriptionFormatted = descriptionMission.replace(/([.!?;]) /g, "$1\n"); // Formater en retour à la ligne lorsqu'on a quelques ponctuations
            const cityMission = mission.city;
            const startMission = mission.start_date;
            const formattedDate = new Date(startMission).toLocaleDateString('fr-FR') // Formater les dates en version fr
            const clientMission = mission.client_name;
            const statusMission = mission.status;
            const urgencyMission = mission.urgency;

            const articleHtml =
                `
                <article class="article_mission">
                    <input type="hidden" class="hero_id" value="${idHero}">
                    <p class="title_mission"><span class="wordBold">Mission n°:</span> ${idMission}</p>
                <div class="article_mission_rangement">
                    <p><span class="wordBold">Nom du client : </span> ${clientMission}</p>
                    <p><span class="wordBold">Mise en ligne le :</span> ${formattedDate}</p>
                    <p class="description_mission"><span class="wordBold">Description :</span> ${descriptionFormatted}</p>
                    <p><span class="wordBold">Ville :</span> ${cityMission}</p>
                    <p><span class="wordBold">Urgence :</span> ${urgencyMission}</p>
                    <p class ="status_mission"><span class="wordBold">Statut :</span> ${statusMission}</p>
                </div>
                <div>
                    <button type="submit" class="button_choose_mission">Choisir cette mission</button>
                    <button type="submit" class="button_validate_mission" data-choosemission="${idMission}">Confirmer</button>
                    <button type="submit" class="button_annuler_mission">Annuler le choix</button>
                    <button type="submit" class="button_finish_mission" data-finishmission="${idMission}">Terminer la mission</button>
                    <a href="/" class="button_link">Retour à l'accueil</a>
                </div>
                </article>
            `;

            const section = document.getElementById("section_dashboard");
            section.innerHTML = section.innerHTML + articleHtml;
        });
        loader.classList.remove("loader");

        const chooseMission = document.querySelectorAll(".button_choose_mission");// Sélectionner tous les boutons "Choisir cette mission" dupliqués

        chooseMission.forEach(buttonChooseMission => { // Boucler pour mettre un listener sur chacun des boutons
            buttonChooseMission.addEventListener('click', async () => {
                buttonChooseMission.style.display = "none"; // Cacher le bouton "Choisir la mission"

                // On doit récupérer le parent du bouton pour afficher les autres boutons de manière dynamique
                const buttonParent = buttonChooseMission.parentElement;
                const buttonAnnuler = buttonParent.querySelector(".button_annuler_mission");
                const buttonTerminer = buttonParent.querySelector(".button_finish_mission");
                const buttonValidate = buttonParent.querySelector(".button_validate_mission");

                buttonAnnuler.style.display = "block"; // Afficher le bouton "Annuler le choix"
                buttonTerminer.style.display = "block"; // Afficher le bouton "Terminer la mission"
                buttonValidate.style.display = "block"; // Afficher le bouton "Confirmer"

                buttonAnnuler.addEventListener('click', () => {
                    buttonAnnuler.style.display = "none"; // Cacher le bouton "Annuler le choix"
                    buttonTerminer.style.display = "none"; // Cacher le bouton "Terminer la mission"
                    buttonValidate.style.display = "none"; // Cacher le bouton "Terminer"
                    buttonChooseMission.style.display = "block"; // Afficher le bouton "Choisir la mission"
                });
            })
        });

        // Filtrer pour n'afficher que les missions "En cours" du héro
        const allArticles = document.querySelectorAll(".article_mission"); // prendre tous les articles

        // Vérifier si le héro a une mission en cours
        const hasMissionEnCours = dataMission.some(mission => {
            return String(mission.id_hero) === String(data.idHero) && mission.status === "En cours";
        });

        allArticles.forEach(article => {
            const idHeroByArticle = article.querySelector(".hero_id").value;
            const idHeroConnect = data.idHero;
            const status = article.querySelector(".status_mission").textContent;

            const idHeroConnectString = String(idHeroConnect);

            // Une mission est disponible si l'id du héro connecté ou d'un autre héro n'est pas dans l'article
            const missionEstDisponible = (idHeroByArticle === "" || idHeroByArticle === "null");

            // Condition pour afficher ma mission en cours, je compare si le héro connecté correspond à l'id du héro dans l'article + le statut
            const maMissionEnCours = (idHeroByArticle === idHeroConnectString && status.includes("En cours"));

            let doitAfficher = false;

            if (hasMissionEnCours && maMissionEnCours) {
                doitAfficher = true;  // J'ai une mission en cours et c'est la mienne
            } else if (!hasMissionEnCours && missionEstDisponible) {
                doitAfficher = true;  // Je n'ai pas de mission et celle-ci est disponible
            }

            if (!doitAfficher) {
                article.style.display = "none";
            }

            // Gérer les boutons
            if (status.includes("En cours")) {
                const buttonChoose = article.querySelector(".button_choose_mission");
                buttonChoose.style.display = "none";

                const buttonFinish = article.querySelector(".button_finish_mission");
                buttonFinish.style.display = "block";

                buttonFinish.addEventListener('click', () => {
                    const buttonIdMission = Number(buttonFinish.dataset.finishmission);
                    window.location.href = `/rapport_mission/${buttonIdMission}`;
                });
            }
        });

        const allBouttonValidateMission = document.querySelectorAll(".button_validate_mission");// Sélectionner tous les boutons "Confirmer" dupliqués
        allBouttonValidateMission.forEach(button => {
            button.addEventListener('click', async () => {
                const buttonIdChoose = Number(button.dataset.choosemission); // Forcer le dataset en nombre pour etre prit en compte
                const response = await fetch(`/api/mission/${buttonIdChoose}/update`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const section = document.getElementById("section_dashboard");
                    section.innerHTML = "";
                    await getMission(); // Rappeler la fonction pour eviter de rafraichir la page et voir la maj des statuts de mission
                } else {
                    const error = await response.json();
                    showToast(error.error);
                }
            })
        })
    } else {
        loader.classList.remove("loader");
        const error = await response.json();
        localStorage.removeItem('token');
        showToast(error.error);
    }
}

getMission();