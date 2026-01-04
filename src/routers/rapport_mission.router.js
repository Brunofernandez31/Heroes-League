import { Router } from 'express';
import { displayRapportMission, sendRapportMission } from '../../data/main_controller.js';

export const rapportHeroRouter = Router();

// Route GET : Afficher le formulaire de rapport de mission
rapportHeroRouter.get('/rapport_mission', displayRapportMission);

// Route POST : Traiter le formulaire de rapport de mission
rapportHeroRouter.post('/rapport_mission', sendRapportMission);