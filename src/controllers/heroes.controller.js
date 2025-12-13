import heroes from "../../data/heroes.js";


export function displayHeroes (req, res) {
  //logique métier ici : (filtres, calculs, appels BDD..)
    res.render("nos-heros", {
    heroes // Données envoyées à la vue
  });
}