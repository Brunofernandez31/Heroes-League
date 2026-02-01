import { Router } from "express";
import { displayHeroesForAdmin, deleteHero } from "../controllers/main_controller.js";
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const displayHeroAdminRouter = Router();

displayHeroAdminRouter.get('/api/admin_heroes',displayHeroesForAdmin);
// displayHeroAdminRouter.delete('/api/heroes', authenticateToken, isAdmin, deleteHero);