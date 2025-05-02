import { prisma } from '../utils/prisma.util.js';

class UserRepository {
  //내 정보 확인
  getMyInfo = async (email) => {
    const getMyInfo = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return getMyInfo;
  };
  SameWithPayload = async (Id) => {
    const user = await prisma.user.findUnique({
      where: { userId: Id },
      // omit: { password: true },
    });
    return user;
  };

  // 사용자가 올린 명소 조회
  getAllSpot = async () => {
    return await prisma.spot.findMany({
      where: {
        isPublic: 'PUBLIC',
      },
      select: {
        spotId: true,
        spotName: true,
        imageUrl: true,
        extraInfo: true,
        userId: true,
        user: {
          select: {
            nickName: true,
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  };

  // 내가 올린 명소 조회
  getMySpot = async (userId) => {
    const data = await prisma.user.findMany({
      where: {
        userId,
      },
      select: {
        userId: true,
        nickName: true,
        profile: true,
        Spot: true,
      },
    });

    return data;
  };
}

export default UserRepository;
