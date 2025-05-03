import CategoryRepository from '../repositories/categroy.repository.js';

class CategoryService {
  categoryRepository = new CategoryRepository();

  // 카테고리 전체 조회
  getAllCategory = async () => {
    const categories = await this.categoryRepository.getAllCategory();
    return categories;
  };
}

export default CategoryService;
