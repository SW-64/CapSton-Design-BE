import { HTTP_STATUS } from '../constants/http-status.constant.js';
import CategoryService from '../services/category.service.js';

class CategoryController {
  categoryService = new CategoryService();
  // 카테고리 전체 조회
  getAllCategory = async (req, res, next) => {
    try {
      const categories = await this.categoryService.getAllCategory();
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '카테고리 전체 조회에 성공했습니다.',
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CategoryController;
