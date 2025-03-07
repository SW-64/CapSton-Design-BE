import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import AuthRepository from '../repositories/auth.repository.js';
import AuthService from '../services/auth.service.js';
import AuthController from '../controllers/auth.controller.js';

const authRouter = express.Router();
const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// 회원가입
authRouter.post('/sign-up', authController.signUp);

// 로그인
authRouter.post('/sign-in', authController.signIn);

// 내 정보 확인
authRouter.get('/getMyInfo');
export { authRouter };
