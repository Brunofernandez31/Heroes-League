import { Router } from 'express';
import { displayTestimonies } from '../../data/main_controller.js';

export const testimoniesRouter = Router();

testimoniesRouter.get('/testimonies', displayTestimonies);