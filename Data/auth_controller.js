import argon2 from "argon2";
import datamapper from "./main_datamapper.js";
import jwt from "jsonwebtoken"

export async function register(req, res) {

    try {
        // Récupérer les infos submit du formulaire register
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        if (!userEmail) {
            return res.status(400).json({ error: "Email requis" });
        }

        if (!userPassword) {
            return res.status(400).json({ error: "Mot de passe requis" });
        }

        const hashPassword = await argon2.hash(userPassword); // Hash du mdp avec argon2

        const userRegister = await datamapper.createUser(userEmail, hashPassword, "user");
        res.status(201).json({ message: "Inscription réussie", userId: userRegister.id_user });


    } catch (err) {
        res.status(500).json({ error: "Erreur de serveur" })
    };
};

export async function login(req, res) {

    try {
        // Récupérer les infos submit du formulaire login
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        if (!userEmail) { // Vérifier s'il y a un email d'entré
            return res.status(400).json({ error: "Email requis" });
        }

        if (!userPassword) { // Vérifier s'il y a un mdp d'entré
            return res.status(400).json({ error: "Mot de passe requis" }); // Status Bad Request (erreur de format)
        }

        const loginUser = await datamapper.getUserByEmail(userEmail) // Chercher l'user dans la bdd
        if (!loginUser) {
            return res.status(400).json({ error: "Email ou mot de passe incorrect" }) // Minimiser les informations si pas d'user trouvé
        }

        const userId = loginUser.id_user;
        const userPasswordHash = loginUser.password;
        if (await argon2.verify(userPasswordHash, userPassword)) { // Vérifier le mot de passe hashé correspond à l'entrée mdp client
            const token = jwt.sign( // Création du token
                {
                userId,
                email: loginUser.email, role: loginUser.role },
                process.env.JWT_SECRET,  // Clé secrète dans le .env
                { expiresIn: '24h' } // Expiration du token
            );

            res.status(200).json({ token }); // Status succès général
        } else {
            res.status(401).json({ error: "Email ou mot de passe incorrect" }) // Status Unauthorized (mauvais identifiant)
        }



    } catch (error) {
        res.status(500).json({ error: "Erreur de serveur" })
    };
};