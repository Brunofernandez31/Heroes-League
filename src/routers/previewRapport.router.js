import { Router } from 'express';
import { previewRapport } from '../../data/main_controller.js';

export const previewRouter = Router();

previewRouter.post('/rapport_mission/:id/preview', previewRapport);