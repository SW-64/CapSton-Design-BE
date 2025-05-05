import { MESSAGES } from '../constants/message.constant.js';
import { NotFoundError } from '../errors/http.error.js';
import UserRepository from '../repositories/user.repository.js';
import SpotRepository from './../repositories/spot.repository.js';

class UserService {
  userRepository = new UserRepository();

  //내 정보 확인
  getMyInfo = async (userId) => {
    //해당되는 userId가 없다면 에러 반환
    const existedUser = await this.userRepository.SameWithPayload(userId);
    if (!existedUser)
      throw new NotFoundError(MESSAGES.USER.GET_MY_INFO.NOT_FOUND_ID);

    return existedUser;
  };

  // 내가 올린 명소 조회
  getMySpot = async (userId) => {
    const spots = await this.userRepository.getMySpot(userId);
    return spots;
  };

  // 내 정보 수정
  updateMyInfo = async (userId, nickname, profile) => {
    const user = await this.userRepository.updateMyInfo(
      userId,
      nickname,
      profile,
    );
    return user;
  };
}

export default UserService;
