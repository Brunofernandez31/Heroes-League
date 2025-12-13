import { Router } from 'express';
import { displayHeroes } from '../controllers/heroes.controller.js';

export const heroesRouter = Router();

heroesRouter.get('/nos-heros', displayHeroes);
// j'ai besoin d'une route
// Quand quelqu'un va sur la route /nos-heros on appelle la fonction displayHeroes qui vient du controller

CREATE USER brubru_hero WITH PASSWORD 'hero';