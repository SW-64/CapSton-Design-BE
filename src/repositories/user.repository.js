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
}

export default UserRepository;
