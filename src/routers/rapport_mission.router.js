import { Router } from 'express';
import { displayRapportMission, previewRapport, sendRapportMission } from '../controllers/main_controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.middleware.js';
import { isHero } from '../middlewares/isHero.middleware.js';

export const rapportHeroRouter = Router();

// Route GET : Afficher le formulaire de rapport de mission
rapportHeroRouter.get('/rapport_mission/:id', displayRapportMission);

// Route POST : Traiter l'affichage du formulaire de rapport de mission AVANT ENVOI
// L'URL du navigateur ne change pas, mais la requête HTTP est bien envoyée en arrière-plan grâce au fetch (méthode AJAX)
rapportHeroRouter.post('/rapport_mission/:id/preview', authenticateToken, isHero, previewRapport);

// Route POST : Mettre à jour la BDD avec le rapport de mission envoyé
rapportHeroRouter.post('/rapport_mission/:id', authenticateToken, isHero, sendRapportMission);