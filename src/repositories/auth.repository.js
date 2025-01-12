import { prisma } from '../utils/prisma.util.js';
import { HASHROUNDS } from '../constants/env.constant.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { client } from '../app.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
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
  tokenToRedis = async (userId) => {
    // 레디스에 사용자의 토큰이 있을 때
    // const userToken = await client.get(`userToken:${userId}`);
    // if (userToken) return userToken;

    // 레디스에 사용자의 토큰이 없을 때
    const payload = { id: userId };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    // await client.set(`userToken:${userId}`, accessToken);
    // await client.expire(`userToken:${userId}`, 3600);

    return accessToken;
  };
}

export default AuthRepository;
