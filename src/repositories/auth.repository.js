import { prisma } from '../utils/prisma.util.js';
import { HASHROUNDS } from '../constants/env.constant.js';
import bcrypt from 'bcrypt';
class AuthRepository {
  // 회원가입
  signUp = async (name, email, password, nickName) => {
    const hashedPassword = bcrypt.hashSync(password, +HASHROUNDS);
    const { password: _, ...user } = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        nickName,
      },
    });
    return user;
  };
  tokenToRedis = async (accessToken) => {};
}

export default AuthRepository;
