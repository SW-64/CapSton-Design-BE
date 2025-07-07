import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../errors/http.error.js';
import AuthRepository from '../repositories/auth.repository.js';
import UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { Worker } from 'worker_threads';
import Piscina from 'piscina';
import { resolve } from 'path';

const pool = new Piscina({
  filename: resolve('./src/utils/bcrypt-worker.util.js'),
  maxThreads: 4, // vCPU 2개니까 4개까지 허용
  minThreads: 2, // 최소 2개 워커 유지
  idleTimeout: 5000, // idle 워커 5초 유지
});
class AuthService {
  authRepository = new AuthRepository();
  userRepository = new UserRepository();
  // 회원가입
  signUp = async (
    name,
    email,
    password,
    passwordConfirm,
    nickname,
    profile,
  ) => {
    // 비밀번호와 비밀번호 확인이 맞지않을 경우 에러 반환
    if (password != passwordConfirm) {
      throw new ConflictError(MESSAGES.AUTH.SIGN_UP.NOT_MATCHED_WITH_PASSWORD);
    }

    // 중복된 이메일이 있을 시 에러 반환
    const existedEmail = await this.userRepository.getMyInfo(email);
    if (existedEmail)
      throw new ConflictError(MESSAGES.AUTH.SIGN_UP.EXISTED_EMAIL);

    const signUp = await this.authRepository.signUp(
      name,
      email,
      password,
      nickname,
      profile,
    );
    return {
      name: signUp.name,
      email: signUp.email,
      nickName: signUp.nickName,
      profile: signUp.profile,
    };
  };

  // 로그인
  signIn = async (email, password) => {
    // 해당되는 email이 없다면 에러 반환
    const existedEmail = await this.userRepository.getMyInfo(email);
    if (!existedEmail) {
      throw new BadRequestError(MESSAGES.AUTH.SIGN_IN.NOT_FOUND);
    }
    const isMatch = await this.comparePassword(password, existedEmail.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = await this.authRepository.tokenToRedis(
      existedEmail.userId,
    );

    console.log(accessToken);
    return accessToken;
  };

  comparePassword = async (password, hash) => {
    return await pool.run({ password, hash });
  };

  hashPassword = async (password, saltRounds = 10) => {
    return await pool.run({ password, saltRounds });
  };
}

export default AuthService;
