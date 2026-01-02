import { Router } from 'express';
import { findClient } from '../../data/main-controller.js';

export const createClientRouter = Router();

// Route GET : Afficher le formulaire
createClientRouter.get('/sauvez-moi', (_req, res) => {
  res.render('sauvez-moi'); // 
});

// Route POST : Traiter le formulaire
createClientRouter.post('/sauvez-moi', findClient);