import { Router } from 'express';
import { findClient, displaySauvezMoiForm } from '../controllers/main_controller.js';

export const createClientRouter = Router();

// Route GET : Afficher le formulaire
createClientRouter.get('/sauvez_moi', displaySauvezMoiForm);

// Route POST : Traiter le formulaire
createClientRouter.post('/sauvez_moi', findClient);