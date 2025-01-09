import { HTTP_STATUS } from '../constants/http-status.constant.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../errors/http.error.js';
import AuthRepository from '../repositories/auth.repository.js';
import UserRepository from '../repositories/user.repository.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class AuthService {
  authRepository = new AuthRepository();
  userRepository = new UserRepository();
  // 회원가입
  signUp = async (name, email, password, passwordConfirm, nickname) => {
    // 비밀번호와 비밀번호 확인이 맞지않을 경우 에러 반환
    if (password != passwordConfirm) {
      throw new ConflictError('비밀번호 불일치');
    }

    // 중복된 이메일이 있을 시 에러 반환
    const existedEmail = await this.userRepository.getMyInfo(email);
    console.log(existedEmail);
    if (existedEmail) throw new ConflictError('중복된 이메일');

    const signUp = await this.authRepository.signUp(
      name,
      email,
      password,
      nickname,
    );
    return {
      name: signUp.name,
      email: signUp.email,
      nickName: signUp.nickName,
    };
  };

  // 로그인
  signIn = async (email, password) => {
    // 해당되는 email이 없다면 에러 반환
    const existedEmail = await this.userRepository.getMyInfo(email);
    if (!existedEmail || !bcrypt.compareSync(password, existedEmail.password)) {
      throw new BadRequestError('사용자 정보 틀림');
    }

    const payload = { id: existedEmail.userId };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: '12h',
    });
    const tokenToRedis = await this.authRepository.tokenToRedis(accessToken);
    return accessToken;
  };
}

export default AuthService;
