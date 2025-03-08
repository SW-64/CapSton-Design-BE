import { MESSAGES } from '../constants/message.constant.js';
import { NotFoundError } from '../errors/http.error.js';
import UserRepository from '../repositories/user.repository.js';

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
}

export default UserService;
