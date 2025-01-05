import CityController from '../controllers/city.controller.js';
import imageUploader from '../middlewares/image-upload.middleware.js';
import CityRepository from '../repositories/city.repository.js';
import CityService from '../services/city.service.js';

import { prisma } from '../utils/prisma.util.js';
import express from 'express';

const cityRouter = express.Router();
const cityRepository = new CityRepository(prisma);
const cityService = new CityService(cityRepository);
const cityController = new CityController(cityService);

// 명소 등록
cityRouter.post(
  '/:cityId/districts/:districtId/spots',
  imageUploader.array('image', 10),
  cityController.setSpot,
);

// 해당 도시 전체 명소 조회
cityRouter.get('/:cityId/spots', cityController.getAllDistrictSpot);

// 해당 행정구역 전체 명소 조회
cityRouter.get(
  '/:cityId/districts/:districtId/spots',
  cityController.getOneDistrictSpot,
);

export { cityRouter };
