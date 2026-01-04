// Récupérer tous les éléments dont on a besoin

const hero = document.getElementById("hero_select");
const duration = document.getElementById("mission_duration");
const tauxHoraire = document.getElementById("hourly_rate");
const total = document.getElementById("total_price");


function totalPrice () {
    const prixHero = tauxHoraire.value;
    const duree = duration.value;

    // Calcul du prix total et le convertir en nombre pour la bdd avec Number
    const totalPrice = Number((prixHero * duree * ( 1+ supplement)).toFixed(2)); // Réduire 2 chiffres apres la virgule
    // On met 1 pour le pourcentage
    // Si on met pas le 1 alors Résultat : 50 × 2 × 0.05 = 5€
    // Correction : Résultat : 50 × 2 × (1 + 0.05) = 105€
    total.value = totalPrice // Envoyé à l'input type texte la value pour le prix total
};


// Il faut mettre un ecouteur d'evenement à chaque fois qu'on peut changer un element influençant le prix
// Et appeler la fonction pour le prix total

duration.addEventListener('change', () => {
    totalPrice()
});


// 'change' permet d'écouter l'evenement quand l'utilisateur change de héro
hero.addEventListener('change', () => {
    const optionSelectionnee = hero.options[hero.selectedIndex];
    const prix = optionSelectionnee.dataset.price
    tauxHoraire.value = prix // Afficher la value dans l'input text du taux horaire du héro

    // Appelle de la fonction pour afficher le prix total
    totalPrice()
});

// Affichage de la modal du rapport de mission

