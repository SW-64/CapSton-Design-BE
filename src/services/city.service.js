import { NotFoundError } from '../errors/http.error.js';
import CityRepository from '../repositories/city.repository.js';

class CityService {
  cityRepository = new CityRepository();
  // 명소 등록
  setSpot = async (spotName, cityId, districtId, imageUrl) => {
    // 중복되는 명소 이름이 있을때 에러반환
    const existedSpot = await this.cityRepository.findSpotName(spotName);
    if (existedSpot)
      throw new BadRequestError('중복되는 명소 이름이 있습니다.');

    // 해당 대도시가 없을 때 에러 반환
    const existedCity = await this.cityRepository.findCity(cityId);
    if (!existedCity) throw new NotFoundError('해당 대도시가 없음');
    // 해당 대도시의 행정구역이 없다면 에러 반환
    const existedDistrct = await this.cityRepository.findDistrict(
      cityId,
      districtId,
    );
    if (!existedDistrct)
      throw new NotFoundError('해당 도시에 맞는 행정구역이 없음');

    const setSpot = await this.cityRepository.setSpot(
      spotName,
      districtId,
      imageUrl,
    );
    return {
      spotId: setSpot.spotId,
      spotName: setSpot.spotName,
      districtId: setSpot.districtId,
      like: setSpot.like,
      imageUrl: setSpot.imageUrl,
    };
  };

  // 해당 도시 전체 명소 조회
  getAllDistrictSpot = async (cityId) => {
    // 해당 대도시가 없을 때 에러 반환
    const existedCity = await this.cityRepository.findCity(cityId);
    if (!existedCity) throw new NotFoundError('해당 대도시가 없음');

    const getAllDistrictSpot =
      await this.cityRepository.getAllDistrictSpot(cityId);
    const AllSpot = getAllDistrictSpot.map((spot) => ({
      spotId: spot.spotId,
      spotName: spot.spotName,
      districtId: spot.districtId,
      like: spot.like,
      imageUrl: spot.imageUrl,
      cityId: spot.district.cityId,
    }));
    return AllSpot;
  };

  //해당 행정구역 전체 명소 조회
  getOneDistrictSpot = async (cityId, districtId) => {
    // 해당 행정구역이 없을 때 에러 반환
    const existedDistrict = await this.cityRepository.findDistrict(
      cityId,
      districtId,
    );
    if (!existedDistrict) throw new NotFoundError('해당 행정구역이 없음');

    const getOneDistrictSpot =
      await this.cityRepository.getOneDistrictSpot(districtId);
    const AllSpot = getOneDistrictSpot.map((spot) => ({
      spotId: spot.spotId,
      spotName: spot.spotName,
      districtId: spot.districtId,
      like: spot.like,
      imageUrl: spot.imageUrl,
      cityId: cityId,
    }));
    return AllSpot;
  };
}

export default CityService;
