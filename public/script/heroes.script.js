const heros = document.querySelectorAll(".article_hero");
// Selector All sur l'article parce que l'image possede un overlay qui empeche le clic

heros.forEach(hero => {
    hero.addEventListener('click', () => {
        const id = hero.querySelector(".img_hero").dataset.id;
        //dataset.id va selectionner dans l'objet data de html la clé id
        window.location.href = `/votre-hero/${id}`; //Construction url de redirection
});
});