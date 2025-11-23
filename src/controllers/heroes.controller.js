import heroes from "../../Data/heroes.js";


export function displayHeroes (req, res) {
    res.render("nos-heros", {
    heroes
  });
}