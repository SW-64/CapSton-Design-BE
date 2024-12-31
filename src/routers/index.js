import express from 'express';
import { spotRouter } from './spot.router.js';
import { userRouter } from './user.router.js';
import { authRouter } from './auth.router.js';

const apiRouter = express.Router();

apiRouter.use('/api/spots', spotRouter);
apiRouter.use('/api/users', userRouter);
apiRouter.use('/api/auth', authRouter);

export { apiRouter };
