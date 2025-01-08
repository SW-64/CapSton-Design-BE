import { HTTP_STATUS } from '../constants/http-status.constant.js';
import UserRepository from '../repositories/user.repository.js';

class UserController {
  userRepository = new UserRepository();

  // 1명의 유저 조회
  getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;

      const user = await this.userRepository.findById(Number(userId));
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: '사용자를 찾을 수 없습니다.',
        });
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '유저 조회 성공',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  // 여러 명의 유저 조회
  getUsers = async (req, res, next) => {
    try {
      const users = await this.userRepository.findAll();

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '유저 목록 조회 성공',
        data: users,
      });
    } catch (err) {
      next(err);
    }
  };

  // 유저 정보 업데이트
  updateUser = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { name, nickName } = req.body;

      const updatedUser = await this.userRepository.updateById(userId, {
        name,
        nickName,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '유저 정보 업데이트 성공',
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  // 유저 삭제
  deleteUser = async (req, res, next) => {
    try {
      const userId = req.user.id;

      await this.userRepository.deleteById(userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '회원 탈퇴 성공',
      });
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
