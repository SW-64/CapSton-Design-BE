import { prisma } from './../utils/prisma.util.js';
class CategoryRepository {
  // 카테고리 전체 조회
  getAllCategory = async () => {
    const categories = await prisma.category.findMany({});
    return categories;
  };

  // 카테고리 상세 조회
  getOneCategory = async (categoryId) => {
    const category = await prisma.category.findUnique({
      where: {
        categoryId,
      },
    });
    return category;
  };
}

export default CategoryRepository;
