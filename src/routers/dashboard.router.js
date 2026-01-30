import { Router } from 'express';
import { displayDashboard ,getMissionsDashboard, updateMissionDashboardById} from '../../data/main_controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { isHero } from '../middlewares/isHero.middelware.js';

export const dashboardRouter = Router();

// Route GET : Afficher la dashboard 
dashboardRouter.get('/dashboard', displayDashboard);

// Route GET : Afficher la dashboard en fonction du héro qui est connecté
dashboardRouter.get('/api/dashboard', authenticateToken, isHero, getMissionsDashboard);

// Route PATCH : modifier l'état de la mission en bdd et en dashboard
dashboardRouter.patch('/api/mission/:id/update', authenticateToken, isHero, updateMissionDashboardById);