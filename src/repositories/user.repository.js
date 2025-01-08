import { prisma } from '../utils/prisma.util.js';

class UserRepository {
  // 1명의 유저 조회
  async findById(userId) {
    return prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        email: true,
        name: true,
        nickName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // 여러 명의 유저 조회
  async findAll() {
    return prisma.user.findMany({
      select: {
        userId: true,
        email: true,
        name: true,
        nickName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // 유저 정보 업데이트
  async updateById(userId, data) {
    return prisma.user.update({
      where: { userId },
      data,
      select: {
        userId: true,
        email: true,
        name: true,
        nickName: true,
        updatedAt: true,
      },
    });
  }

  // 유저 삭제
  async deleteById(userId) {
    return prisma.user.delete({
      where: { userId },
    });
  }
}

export default UserRepository;
