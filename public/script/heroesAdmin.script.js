const heros = document.querySelectorAll(".article_hero");
// Selector All sur l'article parce que l'image possede un overlay qui empeche le clic

heros.forEach(hero => {
    hero.addEventListener('click', () => {
        const id = hero.querySelector(".img_hero").dataset.id;
        //dataset.id va selectionner dans l'objet data de html la clé id
        window.location.href = `/votre_hero/${id}`; //Construction url de redirection
    });
});


const showAll = document.getElementById("show-more-heroes");
let isExpanded = false;

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