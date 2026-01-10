import argon2 from "argon2";
import datamapper from "./main_datamapper.js";

export async function register(req, res) {

    try {
        // Récupérer les infos submit du formulaire register
        const userEmail = req.body.email
        const userPassword = req.body.password

        if (!userEmail) {
            return res.status(400).json({ error: "Email requis" });
        }

        if (!userPassword) {
            return res.status(400).json({ error: "Mot de passe requis" });
        }

        const hashPassword = await argon2.hash(userPassword); // Hash du mdp avec argon2

        const userRegister = await datamapper.createUser(userEmail, hashPassword, "user")
        res.status(201).json({ message: "Inscription réussie", userId: userRegister.id_user });
        

    } catch (err) {
        res.status(500).json({ error : "Erreur de serveur" })
    }
}