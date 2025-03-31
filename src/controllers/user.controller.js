import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import UserService from '../services/user.service.js';

class UsertController {
  userService = new UserService();

  // 내 정보 확인
  getMyInfo = async (req, res, next) => {
    try {
      const user = req.user;
      const { password, ...filteredUser } = await this.userService.getMyInfo(
        user.userId,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USER.GET_MY_INFO.SUCCEED,
        data: filteredUser,
      });
    } catch (err) {
      next(err);
    }
  };

  // 내가 올린 명소 조회
  getMySpot = async (req, res, next) => {
    try {
      const user = req.user;
      const spots = await this.userService.getMySpot(user.userId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USER.GET_MY_INFO.SUCCEED,
        data: spots,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default UsertController;
