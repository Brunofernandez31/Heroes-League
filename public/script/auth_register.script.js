// Récupérer tous les éléments dont on a besoin

const emailUser = document.getElementById("email_register"); // Ne pas récupérer la value tout de suite car elle est vide
// Bien récupérer les valeurs dans le addEventListener
const passwordUser = document.getElementById("password_register");
const buttonSubmit = document.getElementById("send_register");



buttonSubmit.addEventListener("click", async (e) => {

    try {
        e.preventDefault(); // Empecher le rechargement du formulaire d'inscription

        const email = document.getElementById("email_register").value;
        const password = document.getElementById("password_register").value;

        const response = await fetch("/api/auth/register", {
            method: "POST", // La méthode qu'on va envoyer, son type de requête
            headers: { "content-Type": "application/json" }, // Indique qu'on va envoyer du json
            // Le Body c'est le corps de ma requête, on va mettre ce que je veux envoyer dans le backend pour le main_controller
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {  // Status 200-299
            alert("Inscription réussie !");
            window.location.href = '/auth/login';  // Redirige vers la page de connexion
        }

    } catch (error) {
        alert("Erreur, impossible de se connecter au serveur")
        console.error(error);  // Affiche l'erreur pour débug
    }
});

