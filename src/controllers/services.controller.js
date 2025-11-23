import services from "../../Data/services.js";

export function displayServices (req, res) {
    res.render("services" , {
    services
    })
}