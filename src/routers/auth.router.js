import { Router } from "express";
import { register, login, getMe} from "../controllers/auth_controller.js";
import { displayRegister, displayLogin, createHero, displayCreateHero } from "../controllers/main_controller.js";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const authRouter = Router();

// Pour les inscriptions
authRouter.get("/auth/register", displayRegister); // Afficher la page des inscriptions
authRouter.post("/api/auth/register", register); // Poster les informations de création d'un user

// Pour les connexions
authRouter.get("/auth/login", displayLogin); // Afficher la page de connexion
authRouter.post("/api/auth/login", login); // Poster les informations de connexion d'un user

authRouter.get("/api/auth/me", authenticateToken, getMe); // Afficher le nom et prénom de l'user en page d'accueil
authRouter.get("/auth/createHero", authenticateToken, isAdmin, displayCreateHero); // Afficher la page de création des héros
authRouter.post("/api/createHero", authenticateToken, isAdmin, createHero); // Poster les informations de la création du héro