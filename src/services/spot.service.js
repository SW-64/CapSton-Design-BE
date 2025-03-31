import { NotFoundError } from '../errors/http.error.js';
import SpotRepository from '../repositories/spot.repository.js';
import UserRepository from '../repositories/user.repository.js';

class SpotService {
  spotRepository = new SpotRepository();
  userRepository = new UserRepository();
  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    //spotId가 존재하지 않을 때 에러반환
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    return getOneSpot;
  };

  // 명소 삭제
  deleteSpot = async (spotId) => {
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    //spotId가 존재하지 않을 때 에러반환
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    const deleteSpot = await this.spotRepository.deleteSpot(spotId);
    return;
  };

  // 명소 북마크 등록
  setBookmark = async (spotId, userId) => {
    //spotId가 존재하지 않을 때 에러반환
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');

    const setBookmark = await this.spotRepository.setInteraction(
      spotId,
      userId,
    );

    return setBookmark;
  };

  // 명소 북마크 조회
  getBookmark = async (userId) => {
    const getBookmark = await this.spotRepository.getBookmark(userId);

    const AllSpot = getBookmark.map((spot) => ({
      spotId: spot.spotId,
      userId: spot.userId,
      type: spot.type,
    }));
    return AllSpot;
  };

  // 명소 북마크 삭제
  deleteBookmark = async (spotId, userId) => {
    //spotId가 존재하지 않을 때 에러반환
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');

    // 내가 북마크 하지 않은 spot이라면 에러 반환
    const type = 'BOOKMARK';
    const getBookmark = await this.spotRepository.checkInteraction(
      spotId,
      userId,
      type,
    );
    if (!getBookmark) throw new NotFoundError('해당되는 북마크가 없습니다.');
    const deleteBookmark = await this.spotRepository.deleteInteraction(
      spotId,
      userId,
      type,
    );

    return;
  };

  // 명소 좋아요 등록
  setLike = async (spotId, userId) => {
    //spotId가 존재하지 않을 때 에러반환
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    const type = 'LIKE';
    const setLike = await this.spotRepository.setInteraction(
      spotId,
      userId,
      type,
    );

    return {
      spotId: setLike.spotId,
      userId: setLike.userId,
      type: setLike.type,
    };
  };

  // 명소 좋아요 삭제
  deleteLike = async (spotId, userId) => {
    //spotId가 존재하지 않을 때 에러반환
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');

    // 내가 좋아요 하지 않은 spot이라면 에러 반환
    const type = 'LIKE';
    const getLike = await this.spotRepository.checkInteraction(
      spotId,
      userId,
      type,
    );
    if (!getLike) throw new NotFoundError('해당되는 좋아요가 없습니다.');
    const deleteLike = await this.spotRepository.deleteInteraction(
      spotId,
      userId,
      type,
    );

    return;
  };

  // 명소 등록
  setSpot = async (spotName, imageUrl, extraInfo, userId) => {
    // 중복되는 명소 이름이 있을때 에러반환
    const existedSpot = await this.spotRepository.findSpotName(spotName);
    if (existedSpot)
      throw new BadRequestError(MESSAGES.CITY.SET_SPOT.EXISTED_SPOT_NAME);

    const setSpot = await this.spotRepository.setSpot(
      spotName,
      imageUrl,
      extraInfo,
      userId,
    );
    return setSpot;
  };

  // 명소 사진 공개/비공개 전환
  changeVisibility = async (spotId, userId) => {
    //spotId가 존재하지 않을 때 에러반환
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    console.log(getOneSpot);
    // 현재 명소의 상태 확인하기
    const newVisibility =
      getOneSpot.isPublic === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';

    const changeVisibility = await this.spotRepository.changeVisibility(
      userId,
      spotId,
      newVisibility,
    );
    return changeVisibility;
  };

  // 사용자가 올린 전체 명소 조회
  getAllSpot = async () => {
    const getAllSpot = await this.userRepository.getAllSpot();
    return getAllSpot;
  };
}

export default SpotService;
