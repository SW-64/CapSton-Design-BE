import { HTTP_STATUS } from '../constants/http-status.constant.js';
import AuthService from '../services/auth.service.js';

class AuthController {
  authService = new AuthService();

  // 회원가입
  signUp = async (req, res, next) => {
    try {
      const { name, email, password, passwordConfirm, nickname } = req.body;
      const signUp = await this.authService.signUp(
        name,
        email,
        password,
        passwordConfirm,
        nickname,
      );
      console.log(signUp);
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '회원가입 성공',
        data: signUp,
      });
    } catch (err) {
      next(err);
    }
  };

  // 로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const signIn = await this.authService.signIn(email, password);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '로그인 성공',
        data: signIn,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
