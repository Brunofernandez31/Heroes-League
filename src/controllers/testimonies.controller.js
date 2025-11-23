import testimonies from "../../Data/testimonies.js";

export function displayTestimonies (req, res) {
    res.render("testimonies" , {
    testimonies
    })
}