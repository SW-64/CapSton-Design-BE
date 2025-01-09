import { prisma } from '../utils/prisma.util.js';
import { HASHROUNDS } from '../constants/env.constant.js';
import bcrypt from 'bcrypt';
// import { createClient } from 'redis';
// const client = createClient({
//   url: 'database-cache-server-ro.mxkffs.ng.0001.apn2.cache.amazonaws.com:6379',
// });
// client.on('error', (err) => console.log('Redis Client Error', err));

// await client.connect();
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

  // 레디스에 토큰 저장
  tokenRedis = async (accessToken) => {};
}

export default AuthRepository;
