function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

const heros = document.querySelectorAll(".article_hero");
// Selector All sur l'article parce que l'image possede un overlay qui empeche le clic

// Afficher tous les héros
heros.forEach(hero => {
    hero.addEventListener('click', () => {
        const id = hero.querySelector(".img_hero").dataset.id;
        //dataset.id va selectionner dans l'objet data de html la clé id
        window.location.href = `/votre_hero/${id}`; //Construction url de redirection
    });
});


const showAll = document.getElementById("show-more-heroes");
let isExpanded = false;


// Afficher les héros en déroulant leurs photos
showAll.addEventListener("click", () => {
    const allHeroes = document.querySelectorAll(".article_hero");
    const hiddenHeroes = document.querySelectorAll(".hidden-hero");

    if (!isExpanded) {

        hiddenHeroes.forEach((hero, index) => {

            setTimeout(() => {
                hero.classList.toggle("hidden-hero");
                hero.style.animation = "fadeIn 0.5s ease-in";
            }, index * 250);
        });

        showAll.textContent = "Réduire";
        isExpanded = true;

    } else {
        allHeroes.forEach((hero, index) => {

            if (index >= 3) {
                hero.classList.add("hidden-hero");
            }
        });
        showAll.textContent = "Tous nos héros";
        isExpanded = false;
    }
});

const token = localStorage.getItem('token');
const buttonDelete = document.querySelectorAll(".btn-delete");

buttonDelete.forEach(deletebtn => {
    deletebtn.addEventListener('click', async (e) => {
        e.stopPropagation(); // Empecher la propagation jusqu'au parent article que me redirigerait vers la page de mon héro que je tente de supprimé
        const id = deletebtn.dataset.id;
        const response = await fetch(`/api/admin_heroes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            const parentDeleteButton = deletebtn.parentElement; // Remonter au parent du logo-boutton "supprimer"
            parentDeleteButton.remove(); // Supprimer l'article sans refresh pour un meilleur UX
            showToast(result.message);
        } else {
            const error = await response.json();
            showToast(error.error);
        }
    })
});