import { BadRequestError, NotFoundError } from '../errors/http.error.js';
import CategoryRepository from '../repositories/categroy.repository.js';
import SpotRepository from '../repositories/spot.repository.js';
import UserRepository from '../repositories/user.repository.js';

class SpotService {
  spotRepository = new SpotRepository();
  userRepository = new UserRepository();
  categoryRepository = new CategoryRepository();
  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    //spotId가 존재하지 않을 때 에러반환
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    return getOneSpot;
  };

  // 명소 삭제
  deleteSpot = async (spotId, userId) => {
    const getOneSpot = await this.spotRepository.getMySpot(spotId, userId);
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
      getBookmark.interactionId,
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
  setSpot = async (spotName, imageUrl, extraInfo, userId, categoryList) => {
    // 중복되는 명소 이름이 있을때 에러반환
    const existedSpot = await this.spotRepository.findSpotName(spotName);
    if (existedSpot)
      throw new BadRequestError('MESSAGES.CITY.SET_SPOT.EXISTED_SPOT_NAME');

    const categories = categoryList
      ? await Promise.all(
          categoryList.map(async (category) => {
            const categoryList =
              await this.categoryRepository.getOneCategory(+category);
            if (!categoryList)
              throw new NotFoundError('존재하지 않는 카테고리입니다.');
          }),
        )
      : null;
    console.log(categoryList);
    const setSpot = await this.spotRepository.setSpot(
      spotName,
      imageUrl,
      extraInfo,
      userId,
      categoryList,
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
  getAllSpot = async (categoryList) => {
    const existedCategory =
      !Array.isArray(categoryList) && categoryList
        ? [categoryList]
        : categoryList;

    const categories = existedCategory
      ? await Promise.all(
          existedCategory.map(async (category) => {
            const existedCategory =
              await this.categoryRepository.getOneCategory(+category);
            if (!existedCategory)
              throw new NotFoundError('존재하지 않는 카테고리입니다.');
          }),
        )
      : null;
    const getAllSpot = await this.spotRepository.getAllSpot(existedCategory);
    return getAllSpot;
  };

  // 명소 수정
  updateSpot = async (extraInfo, spotId, userId, categoryList) => {
    const getOneSpot = await this.spotRepository.getMySpot(spotId, userId);
    //spotId가 존재하지 않을 때 에러반환
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    const categories = categoryList
      ? await Promise.all(
          categoryList.map(async (category) => {
            const categoryList =
              await this.categoryRepository.getOneCategory(+category);
            if (!categoryList)
              throw new NotFoundError('존재하지 않는 카테고리입니다.');
          }),
        )
      : null;
    const updateSpot = await this.spotRepository.updateSpot(
      extraInfo,
      spotId,
      categories,
    );
    return updateSpot;
  };
}

export default SpotService;
