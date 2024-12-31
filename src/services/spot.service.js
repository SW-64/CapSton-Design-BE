import { NotFoundError } from '../errors/http.error.js';
import SpotRepository from '../repositories/spot.repository.js';

class SpotService {
  spotRepository = new SpotRepository();
  // 명소 등록
  setSpot = async (spotName, region, imageUrl) => {
    // 중복되는 명소 이름이 있을때 에러반환
    const existedSpot = await this.spotRepository.findSpotName(spotName);
    if (existedSpot)
      throw new BadRequestError('중복되는 명소 이름이 있습니다.');

    const setSpot = await this.spotRepository.setSpot(
      spotName,
      region,
      imageUrl,
    );
    return {
      spotId: setSpot.spotId,
      spotName: setSpot.spotName,
      region: setSpot.region,
      like: setSpot.like,
      imageUrl: setSpot.imageUrl,
    };
  };

  // 전체 명소 조회
  getAllSpot = async (region) => {
    const getAllSpot = await this.spotRepository.getAllSpot(region);

    const AllSpot = getAllSpot.map((spot) => ({
      spotId: spot.spotId,
      spotName: spot.spotName,
      region: spot.region,
      like: spot.like,
      imageUrl: spot.imageUrl,
    }));
    return AllSpot;
  };

  // 상세 명소 조회
  getOneSpot = async (spotId) => {
    const getOneSpot = await this.spotRepository.getOneSpot(spotId);
    //spotId가 존재하지 않을 때 에러반환
    if (!getOneSpot) throw new NotFoundError('해당되는 명소가 없습니다.');

    return {
      spotId: getOneSpot.spotId,
      spotName: getOneSpot.spotName,
      region: getOneSpot.region,
      like: getOneSpot.like,
      imageUrl: spot.imageUrl,
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
  setBookmark = async (spotId) => {
    const setBookmark = await this.spotRepository.setBookmark(spotId);

    return {
      spotId: setBookmark.spotId,
      userId: setBookmark.userId,
      type: setBookmark.type,
    };
  };

  // 명소 북마크 조회
  getBookmark = async (spotId) => {
    const getBookmark = await this.spotRepository.getBookmark(spotId);

    const AllSpot = getBookmark.map((spot) => ({
      spotId: spot.spotId,
      userId: spot.userId,
      type: spot.type,
    }));
    return AllSpot;
  };
}

export default SpotService;
