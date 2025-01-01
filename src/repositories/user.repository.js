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
}

export default UserRepository;
