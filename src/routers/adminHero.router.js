import { Router } from "express";
import { displayHeroesForAdmin, deleteHero } from "../controllers/main_controller.js";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const displayHeroAdminRouter = Router();

// Afficher les héros
displayHeroAdminRouter.get('/api/admin_heroes',displayHeroesForAdmin);

// Supprimer un héro
displayHeroAdminRouter.delete('/api/admin_heroes/:id', authenticateToken, isAdmin, deleteHero);