import { Router } from 'express';
import { displayTestimonies } from '../controllers/testimonies.controller.js';

export const testimoniesRouter = Router();

testimoniesRouter.get('/testimonies', displayTestimonies);