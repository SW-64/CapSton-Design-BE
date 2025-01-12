import { NotFoundError } from '../errors/http.error.js';
import SpotRepository from '../repositories/spot.repository.js';

class SpotService {
  spotRepository = new SpotRepository();

  //상세 명소 조회
  getOneSpot = async (spotId) => {
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    //spotId가 존재하지 않을 때 에러반환
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    return {
      spotId: getOneSpot.spotId,
      spotName: getOneSpot.spotName,
      like: getOneSpot.like,
      imageUrl: getOneSpot.imageUrl,
      districtId: getOneSpot.districtId,
      cityId: getOneSpot.cityId,
    };
  };

  // 명소 삭제
  deleteSpot = async (spotId) => {
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    //spotId가 존재하지 않을 때 에러반환
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    const deleteSpot = await this.spotRepository.deleteSpot(spotId);
    return {
      spotId: deleteSpot.spotId,
      spotName: deleteSpot.spotName,
      region: deleteSpot.region,
      like: deleteSpot.like,
    };
  };

  // 명소 북마크 등록
  setBookmark = async (spotId, userId) => {
    //spotId가 존재하지 않을 때 에러반환
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');
    const type = 'BOOKMARK';
    const setBookmark = await this.spotRepository.setInteraction(
      spotId,
      userId,
      type,
    );

    return {
      spotId: setBookmark.spotId,
      userId: setBookmark.userId,
      type: setBookmark.type,
    };
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

  // 명소 리뷰 등록
  setReview = async (spotId, userId, rate, content) => {
    //spotId가 존재하지 않을 때 에러반환
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');

    const setReview = await this.spotRepository.setReview(
      spotId,
      userId,
      rate,
      content,
    );

    return {
      spotId: setReview.spotId,
      userId: setReview.userId,
      type: setReview.type,
    };
  };

  // 명소 리뷰 전체 조회
  getAllReview = async (spotId) => {
    const getAllReview = await this.spotRepository.getAllReview(spotId);

    const AllReview = getAllReview.map((review) => ({
      spotId: review.spotId,
      userId: review.userId,
      rate: review.rate,
      content: review.content,
    }));
    return AllReview;
  };

  // 명소 리뷰 상세 조회
  getOneReview = async (spotId, reviewId, userId) => {
    const getOneReview = await this.spotRepository.getOneReview(
      spotId,
      reviewId,
      userId,
    );
    return {
      spotId: getOneReview.spotId,
      userId: getOneReview.userId,
      rate: getOneReview.rate,
      content: getOneReview.content,
    };
  };
}

export default SpotService;
