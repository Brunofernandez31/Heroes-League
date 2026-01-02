import { Router } from 'express';
import { displayHeroes, displayHeroesById} from '../../data/main-controller.js';

export const heroesRouter = Router();

heroesRouter.get('/nos-heros', displayHeroes);
heroesRouter.get('/votre-hero/:id', displayHeroesById)