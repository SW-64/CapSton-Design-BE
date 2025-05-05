import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import UserRepository from '../repositories/user.repository.js';

import UsertController from '../controllers/user.controller.js';
import UserService from '../services/user.service.js';
import { requireAccessToken } from './../middlewares/require-access-token.middlewares.js';

const userRouter = express.Router();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UsertController(userService);

// 내 정보 조회
userRouter.get('/getMyInfo', requireAccessToken, userController.getMyInfo);

// 내가 올린 명소 조회
userRouter.get('/getMySpot', requireAccessToken, userController.getMySpot);

// 내 정보 수정
userRouter.patch('/me', requireAccessToken, userController.updateMyInfo);

export { userRouter };
