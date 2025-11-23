import { Router } from 'express';
import { heroesRouter } from '../routers/heroes.router.js';
import { servicesRouter } from '../routers/services.router.js';
import { testimoniesRouter } from '../routers/testimonies.router.js';

export const router = Router();

// On utilise les routeurs importés
router.use(heroesRouter);
router.use(servicesRouter);
router.use(testimoniesRouter);