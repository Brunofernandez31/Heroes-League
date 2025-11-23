import { Router } from 'express';
import { displayServices } from '../controllers/services.controller.js';

export const servicesRouter = Router();

servicesRouter.get('/services', displayServices);