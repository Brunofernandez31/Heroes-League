import { Router } from 'express';
import { displayHeroes } from '../controllers/heroes.controller.js';

export const heroesRouter = Router();

heroesRouter.get('/nos-heros', displayHeroes);