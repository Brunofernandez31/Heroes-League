const hero = document.getElementById("hero_select");
const duration = document.getElementById("mission_duration");
const tauxHoraire = document.getElementById("hourly_rate");
const supplementNull = document.getElementById("urgency_normal");
const supplementThreeDays = document.getElementById("urgency_three_days");
const supplementImmediate = document.getElementById("urgency_immediate");
const total = document.getElementById("total_price");


// 'change' permet d'écouter l'evenement quand l'utilisateur change de héro
hero.addEventListener('change', () => {
    // 
    const optionSelectionnee = hero.options[hero.selectedIndex];
    const prix = optionSelectionnee.dataset.price
    tauxHoraire.value = prix // Afficher la value dans l'input text du taux horaire du héro
});

function totalPrice () {
    const prixHero = tauxHoraire.value;
    const duree = duration.value;

    let supplement = 0;
    if() {

    } else if (supplementThreeDays.checked) {
        supplement = 0.05
    } else if (supplementImmediate.checked) {
        supplement = 0.15
    }

    const totalPrice = prixHero * duree * radioUrgency * supplement;
    total = Number(totalPrice.value)
}