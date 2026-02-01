import { Router } from 'express';
import { heroesRouter } from './heroes.router.js';
import { servicesRouter } from './services.router.js';
import { testimoniesRouter } from './testimonies.router.js';
import { createClientRouter } from './sauvez_moi.router.js'
import { rapportHeroRouter } from './rapport_mission.router.js';
import { authRouter } from './auth.router.js';
import { displayHeroRouter } from './createHero.router.js';
import { dashboardRouter } from './dashboard.router.js';
import { displayHeroAdminRouter } from './adminHero.router.js'

export const router = Router();

// On utilise les routeurs importés
router.use(heroesRouter);
router.use(servicesRouter);
router.use(testimoniesRouter);
router.use(createClientRouter);
router.use(rapportHeroRouter);
router.use(authRouter);
router.use(displayHeroRouter);
router.use(dashboardRouter);
router.use(displayHeroAdminRouter);