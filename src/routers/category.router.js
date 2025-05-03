import CategoryController from '../controllers/category.controller.js';
import CategoryRepository from '../repositories/categroy.repository.js';
import CategoryService from '../services/category.service.js';
import { prisma } from '../utils/prisma.util.js';
import express from 'express';

const categoryRouter = express.Router();
const categoryRepository = new CategoryRepository(prisma);
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

// 카테고리 전체 조회
categoryRouter.get('', categoryController.getAllCategory);

export { categoryRouter };
