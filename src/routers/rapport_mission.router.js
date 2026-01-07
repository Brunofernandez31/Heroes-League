import { Router } from 'express';
import { displayRapportMission, previewRapport, sendRapportMission } from '../../data/main_controller.js';

export const rapportHeroRouter = Router();

// Route GET : Afficher le formulaire de rapport de mission
rapportHeroRouter.get('/rapport_mission/:id', displayRapportMission);

// Route POST : Traiter l'affichage du formulaire de rapport de mission AVANT ENVOI
rapportHeroRouter.post('/rapport_mission/:id', previewRapport);