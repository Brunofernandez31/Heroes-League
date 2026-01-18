
async function headerDynamique() {

    // Récupérer les élements du DOM
    const welcome = document.getElementById("welcome");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");
    const register = document.getElementById("register");
    const createHero = document.getElementById("createHero");
    const mission = document.getElementById("mission");

    // Récupérer le token
    const token = localStorage.getItem('token');

    // Vérifier si le token existe
    if (!token) { // S'il n'existe pas, arrêter la fonction
        return
    } else {
        const response = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {  // Status 200-299

            const data = await response.json();

            const firstName = data.firstName;
            const lastName = data.lastName;

            // Mettre en Majuscule au début du nom et du prénom
            const majfirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            const majlastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

            // Ajouter le nom et le prenom après "Bienvenue"
            welcome.textContent = `Bienvenue ${majfirstName} ${majlastName}`;
            // Afficher le message de Bienvenue
            welcome.style.display="block";

            // Enlever le bouton de connexion et d'inscription
            login.style.display = 'none';
            register.style.display = 'none';

            // Ajouter le bouton de déconnexion
            logout.style.display = "block";

            // Gérer l'evenement pour la déconnexion
            logout.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem('token');  // Supprime le token
                window.location.href = '/';  // Redirige sur l'accueil
            });

            // Gérer en fonction du rôle l'affichage souhaité dans la nav
            const role = data.role;
            if (role === 'hero') {
                createHero.style.display = 'none';
                mission.style.display = 'block';
            } else if (role === 'admin') {
                createHero.style.display='block';
                mission.style.display = 'none';
            }
        } else { // Supprimer le token si la response Not Ok
            localStorage.removeItem('token');
        }
    }
}

headerDynamique();
