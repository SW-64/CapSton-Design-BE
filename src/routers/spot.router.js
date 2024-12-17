import SpotController from '../controllers/spot.controller.js';
import SpotRepository from '../repositories/spot.repository.js';
import SpotService from '../services/spot.service.js';
import { prisma } from '../utils/prisma.util.js';
import express from 'express';

const spotRouter = express.Router();
const spotRepository = new SpotRepository(prisma);
const spotService = new SpotService(spotRepository);
const spotController = new SpotController(spotService);
// 명소 등록
spotRouter.post('/', spotController.setSpot);

// 전체 명소 조회
spotRouter.get('/', spotController.getAllSpot);

// 상세 명소 조회
spotRouter.get('/:spotId', spotController.getOneSpot);

// 명소 삭제
spotRouter.delete('/:spotId', spotController.deleteSpot);
export { spotRouter };
