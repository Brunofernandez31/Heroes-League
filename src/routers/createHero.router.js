import { Router } from "express";
import { displayCreateHero, createHero } from "../controllers/main_controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { authenticateToken } from "../middlewares/authenticateToken.middleware.js"

export const displayHeroRouter = Router();

displayHeroRouter.get('/creation_hero', displayCreateHero)
displayHeroRouter.post('/api/heroes', authenticateToken, isAdmin, createHero);