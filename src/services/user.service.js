import { NotFoundError } from '../errors/http.error.js';
import UserRepository from '../repositories/user.repository.js';

class UserService {
  userRepository = new UserRepository();

  //내 정보 확인
  getMyInfo = async (userId) => {
    //해당되는 userId가 없다면 에러 반환
    const existedUser = await this.userRepository.SameWithPayload(userId);
    if (!existedUser) throw new NotFoundError('해당되는 ID가 없습니다.');

    return existedUser;
  };
}

export default UserService;
