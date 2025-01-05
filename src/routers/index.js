import express from 'express';
import { spotRouter } from './spot.router.js';
import { userRouter } from './user.router.js';
import { authRouter } from './auth.router.js';
import { requireAccessToken } from '../middlewares/require-access-token.middlewares.js';
import { cityRouter } from './city.router.js';

const apiRouter = express.Router();

apiRouter.use('/api/cities', requireAccessToken, cityRouter);
apiRouter.use('/api/spots', requireAccessToken, spotRouter);
apiRouter.use('/api/users', userRouter);
apiRouter.use('/api/auth', authRouter);

export { apiRouter };
