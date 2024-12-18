import express from 'express';

const userRouter = express.Router();
const userRepository = new UsertRepository(prisma);
const userService = new UsertService(userRepository);
const userController = new UsertController(userService);

export { userRouter };
