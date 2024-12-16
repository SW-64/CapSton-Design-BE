import express from 'express';
import { spotRouter } from './spot.router.js';

const apiRouter = express.Router();

apiRouter.use('/api/spots', spotRouter);

export { apiRouter };
