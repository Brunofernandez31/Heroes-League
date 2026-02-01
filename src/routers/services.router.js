import { Router } from 'express';
import { displayServices } from '../controllers/main_controller.js';

export const servicesRouter = Router();

servicesRouter.get('/services', displayServices);