import SpotController from '../controllers/spot.controller.js';
import CityRepository from '../repositories/city.repository.js';
import SpotRepository from '../repositories/spot.repository.js';
import SpotService from '../services/spot.service.js';
import { prisma } from '../utils/prisma.util.js';
import express from 'express';

const spotRouter = express.Router();
const spotRepository = new SpotRepository(prisma);
const spotService = new SpotService(spotRepository);
const spotController = new SpotController(spotService);
// 명소 북마크 조회
spotRouter.get('/bookmark', spotController.getBookmark);

// 상세 명소 조회
spotRouter.get('/:spotId', spotController.getOneSpot);

// 명소 삭제
spotRouter.delete('/:spotId', spotController.deleteSpot);

// 명소 북마크 등록
spotRouter.post('/:spotId/bookmark', spotController.setBookmark);

// 명소 북마크 삭제
spotRouter.delete('/:spotId/bookmark', spotController.deleteBookmark);

// 명소 좋아요 등록
spotRouter.post('/:spotId/like', spotController.setLike);

// 명소 좋아요 삭제
spotRouter.delete('/:spotId/like', spotController.deleteLike);

// 명소 리뷰 등록
spotRouter.post('/:spotId/reviews', spotController.setReview);

// 명소 리뷰 전체 조회
spotRouter.get('/:spotId/reviews', spotController.getAllReview);

// 명소 리뷰 상세 조회
spotRouter.get('/:spotId/reviews/:reviewId', spotController.getOneReview);
export { spotRouter };
