import { Router } from 'express';
import { displayTestimonies } from '../../data/main-controller.js';

export const testimoniesRouter = Router();

testimoniesRouter.get('/testimonies', displayTestimonies);