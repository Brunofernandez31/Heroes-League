// Récupérer tous les éléments dont on a besoin

const emailUser = document.getElementById("email_login"); // Ne pas récupérer la value tout de suite car elle est vide
// Bien récupérer les valeurs dans le addEventListener
const passwordUser = document.getElementById("password_login");
const buttonSubmit = document.getElementById("send_login");



buttonSubmit.addEventListener("click", async (e) => {

    try {
        e.preventDefault(); // Empecher le rechargement du formulaire de connexion

        const email = document.getElementById("email_login").value;
        const password = document.getElementById("password_login").value;

        const response = await fetch("/api/auth/login", {
            method: "POST", // La méthode qu'on va envoyer, son type de requête
            headers: { "content-Type": "application/json" }, // Indique qu'on va envoyer du json
            // Le Body c'est le corps de ma requête, on va mettre ce que je veux envoyer dans le backend pour le main_controller
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        // console.log(data) // token : leTokenSuperLong

        if (response.ok) {  // Status 200-299
            console.log("Connexion réussie !");
            localStorage.setItem('token', data.token); // Stockage du token dans le localStorage
            window.location.href = '/';  // Redirige vers la page d'accueil
        } else {
            localStorage.removeItem('token');  // Supprime le vieux token s'il est expiré
        }

    } catch (error) {
        alert("Erreur, impossible de se connecter au serveur")
        console.error(error);  // Affiche l'erreur pour débug
    }
});

