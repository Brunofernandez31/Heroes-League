import { Router } from 'express';
import { displayMissionsDashboard, updateMissionDashboard } from '../../data/main_controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { isHero } from '../middlewares/isHero.middelware.js';

export const rapportHeroRouter = Router();

// Route GET : Afficher la dashboard en fonction du héro qui est connecté
rapportHeroRouter.get('/dashboard/:id', authenticateToken, isHero, displayMissionsDashboard);

// Route POST : modifier l'état de la mission en bdd et en dashboard
rapportHeroRouter.patch('/dashboard/:id', authenticateToken, isHero, updateMissionDashboard);