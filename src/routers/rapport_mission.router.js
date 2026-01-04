import { Router } from 'express';
import { displayRapportMission } from '../../data/main-controller.js';

export const rapportHeroRouter = Router();

rapportHeroRouter.get('/rapport_mission', displayRapportMission);
rapportHeroRouter.post('/rapport_mission', displayRapportMission);