import { Router } from 'express';
import { findClient, displaySauvezMoiForm } from '../../data/main-controller.js';

export const createClientRouter = Router();

// Route GET : Afficher le formulaire
createClientRouter.get('/sauvez-moi', displaySauvezMoiForm);

// Route POST : Traiter le formulaire
createClientRouter.post('/sauvez-moi', findClient);