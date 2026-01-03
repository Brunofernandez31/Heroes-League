import { Router } from 'express';
import { heroesRouter } from '../routers/heroes.router.js';
import { servicesRouter } from '../routers/services.router.js';
import { testimoniesRouter } from './testimonies.router.js';
import { createClientRouter } from '../routers/sauvez_moi.router.js'
import { rapportHeroRouter } from './rapport_mission.router.js';

export const router = Router();

// On utilise les routeurs importés
router.use(heroesRouter);
router.use(servicesRouter);
router.use(testimoniesRouter);
router.use(createClientRouter);
router.use(rapportHeroRouter);