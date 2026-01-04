import { Router } from 'express';
import { displayHeroes, displayHeroesById} from '../../data/main_controller.js';

export const heroesRouter = Router();

heroesRouter.get('/nos_heros', displayHeroes);
heroesRouter.get('/votre_hero/:id', displayHeroesById)