import express from 'express';
import UserController from '../controllers/user.controller.js';
import { requireAccessToken } from '../middlewares/require-access-token.middlewares.js';

const userRouter = express.Router();
const userController = new UserController();

// 여러 명의 유저 조회
userRouter.get('/', requireAccessToken, userController.getUsers);

// 1명의 유저 조회
userRouter.get('/:id', requireAccessToken, userController.getUserById);

// 유저 정보 업데이트
userRouter.patch('/me', requireAccessToken, userController.updateUser);

// 회원 탈퇴
userRouter.delete('/me', requireAccessToken, userController.deleteUser);

export { userRouter };
