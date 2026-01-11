
async function checkAuth() {

    // Récupérer le token qui est stocké en LS gr$ace au script passé dans login.ejs vient du middleware grace à son next
    const token = localStorage.getItem("token")

    if (token) { // Vérifier si un token existe
        const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            const firstName = data.firstName;
            const lastName = data.lastName;

            // Récupérer la class welcome_user dans index.ejs
            const user = document.querySelector(".welcome_user");
            // Ecrire dans le DOM
            user.textContent = `Bienvenue ${firstName} ${lastName}`

        } else { // Supprimer le token si la response est false
            localStorage.removeItem('token');
        }
    }
}
checkAuth();