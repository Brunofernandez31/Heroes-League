// Récupérer le formulaire
const form = document.getElementById("create_hero_form");

form.addEventListener("submit", async (e) => { // Pas oublier async vu qu'on attend une réponse du serveur
    try {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            console.log("token absent")
            return
        }

        // Récupérer toutes les valeurs du champ du formulaire
        const name = document.getElementById("name").value;
        const advantage = document.getElementById("advantage").value;
        const disadvantage = document.getElementById("disadvantage").value;
        const price_per_hour = document.getElementById("price_per_hour").value;
        const quartier = document.getElementById("quartier").value;
        const other_price = document.getElementById("other_price").value;

        const response = await fetch("/api/createHero", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            // Envoyer tout le paquet de valeur du formulaire dans le controlleur gr$ace au body
            body: JSON.stringify({ name, advantage, disadvantage, price_per_hour, quartier, other_price })
        })

        if (response.ok) {
            const data = await response.json();
            const idHero = data.heroId;
            console.log(`Le héro a bien été créer avec l'id ${idHero}`);
            window.location.href = "/"; // Rediriger vers l'accueil
        } else {
            const error = await response.json();
            alert("Erreur : " + error.error);
        }

    }
    catch (error) {
        console.log("Impossible de créer le héros");
        console.error(error);
    }
})