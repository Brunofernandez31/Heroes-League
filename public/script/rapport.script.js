// Récupérer tous les éléments dont on a besoin

const hero = document.getElementById("hero_select");
const duration = document.getElementById("mission_duration");
const tauxHoraire = document.getElementById("hourly_rate");
const supplementNull = document.getElementById("urgency_normal");
const supplementThreeDays = document.getElementById("urgency_three_days");
const supplementImmediate = document.getElementById("urgency_immediate");
const total = document.getElementById("total_price");


function totalPrice () {
    const prixHero = tauxHoraire.value;
    const duree = duration.value;

    let supplement = 0;
    if(supplementNull.checked) { // Vérifier quel bouton radio est coché grâce à "checked"
        supplement = 0;
    } else if (supplementThreeDays.checked) {
        supplement = 0.05
    } else if (supplementImmediate.checked) {
        supplement = 0.15
    }

    // Calcul du prix total
    const totalPrice = prixHero * duree * ( 1+supplement); // On met 1 pour le pourcentage
    // Si on met pas le 1 alors Résultat : 50 × 2 × 0.05 = 5€
    // Correction : Résultat : 50 × 2 × (1 + 0.05) = 105€
    total.value = totalPrice // Envoyé à l'input type texte la value pour le prix total
};


// Il faut mettre un ecouteur d'evenement à chaque fois qu'on peut changer un element influençant le prix
// Et appeler la fonction pour le prix total

supplementNull.addEventListener('change', () => {
    totalPrice()
});

supplementThreeDays.addEventListener('change', () => {
    totalPrice()
});

supplementImmediate.addEventListener('change', () => {
    totalPrice()
});

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