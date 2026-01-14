import { Router } from "express";
import { displayCreateHero, createHero } from "../../data/main_controller.js";
import { isAdmin } from "../middlewares/isAdmin.middelware.js"
import { authenticateToken } from "../middlewares/authenticateToken.js"

export const displayHeroRouter = Router();

displayHeroRouter.get('/creation_hero', displayCreateHero)
displayHeroRouter.post('/api/heroes', authenticateToken, isAdmin, createHero);