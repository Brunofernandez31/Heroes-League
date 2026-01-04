import { Router } from 'express';
import { calculRapportMission } from '../../data/main_controller.js';

export const calculRapportRouter = Router();

calculRapportRouter.post('/rapport_mission/:id/preview', calculRapportMission);