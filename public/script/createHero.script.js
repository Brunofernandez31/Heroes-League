// Récupérer le formulaire
const form = document.getElementById("create_hero_form");

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

form.addEventListener("submit", async (e) => { // Pas oublier async vu qu'on attend une réponse du serveur
    try {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            console.log("token absent")
            return
        }

        // Récupérer toutes les valeurs du champ du formulaire de création de héro
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const emailHero = document.getElementById("emailHero").value;
        const password = document.getElementById("passwordHero").value;
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
            // Envoyer tout le paquet d'infos du formulaire dans le controlleur grâce au body
            body: JSON.stringify({ firstName, lastName, emailHero, password, advantage, disadvantage, price_per_hour, quartier, other_price })
        })

        if (response.ok) {
            await response.json();
            window.location.href = "/admin_heroes";
        } else {
            if (response.status === 401) { // Supprimer le token uniquement si on a un probleme d'authentification
                localStorage.removeItem('token');
                }

                const error = await response.json();
                showToast(error.error);
        }

    }
    catch (error) {
        showToast("Impossible de créer le héro");
    }
})